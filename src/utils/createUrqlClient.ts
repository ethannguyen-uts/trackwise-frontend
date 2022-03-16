import {
  dedupExchange,
  fetchExchange,
  gql,
  stringifyVariables,
  Exchange,
} from 'urql'
import { Cache, cacheExchange, Resolver } from '@urql/exchange-graphcache'
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  VoteMutationVariables,
} from '../generated/graphql'
import { typeUpdateQueryFn } from './typeUpdateQueryFn'
import { pipe, tap } from 'wonka'
import Router from 'next/router'
import { isServer } from './isServer'

//handle global errors
export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error) {
          // the error is a CombinedError with networkError and graphqlErrors properties
          //sentryFireAndForgetHere() // Whatever error reporting you have
          if (error?.message.includes('Not authenticated')) {
            Router.replace('/login')
            return
          }
        }
      })
    )
  }

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  //this function also run on next js server one time
  let cookie = ''
  if (isServer()) {
    cookie = ctx.req.headers.cookie
  }
  return {
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include',
      headers: cookie ? { cookie } : undefined, //forward cookie to nextjs server for SSR rendering
    } as const,

    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        //client side resolver will run whenever the query runs
        resolvers: {
          Query: {
            posts: cursorPagination(), //parameter map with post.graphql
          },
        },
        updates: {
          Mutation: {
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables
              const data = cache.readFragment(
                gql`
                  fragment PostSnippetFragment on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              )
              console.log(data)
              if (data) {
                let newPoints: number = data.points as number

                if (data.voteStatus) {
                  //User has already voted before
                  if (value === data.voteStatus) {
                    console.log(data.points)
                    newPoints = data.points
                  } else if (value !== data.voteStatus) {
                    //user change their mind
                    newPoints = (data.points as number) + 2 * value
                  }
                } else {
                  //User has not voted before
                  newPoints = (data.points as number) + 1
                }

                cache.writeFragment(
                  gql`
                    fragment PostSnippetFragment on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value }
                )
              }
            },

            createPost: (_result, args, cache, info) => {
              //console.log(cache.inspectFields('Query'))
              invalidateAllPosts(cache)
              //console.log(cache.inspectFields('Query'))
            },

            logout: (_result, args, cache, info) => {
              typeUpdateQueryFn<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            login: (_result, args, cache, info) => {
              typeUpdateQueryFn<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return {
                      me: result.login.user,
                    }
                  }
                }
              ),
                //reset cache to reload all posts
                invalidateAllPosts(cache)
            },
            register: (_result, args, cache, info) => {
              typeUpdateQueryFn<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return {
                      me: result.register.user,
                    }
                  }
                }
              )
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
}

//copy from https://github.com/FormidableLabs/urql/blob/main/exchanges/graphcache/src/extras/simplePagination.ts
export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info
    //console.log(entityKey, fieldName) // entityKey: Query, fieldname: posts (posts query)
    //get all the query inside the cache
    const allFields = cache.inspectFields(entityKey)
    //console.log(allFields)
    /*
      [
        {
          fieldKey: 'posts({"limit":10})',
          fieldName: 'posts',
          arguments: { limit: 10 }
        }
      ]
    */

    //filter posts query (fieldname = posts)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }
    //console.log('fieldArgs: ', fieldArgs)
    /*

     */

    // Next step: check if data is in the cache => just return from the cache
    // Additionally, tell urql when to do the query by using (info.partial = true)
    // which means we does not give urql all the data, then urql will fetch it from the server

    //check if the query was not in the cache
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    //console.log('fieldKey', fieldKey)
    const key = cache.resolve(entityKey, fieldKey) as string
    const isPostInTheCache = cache.resolve(key, 'posts') as string
    //console.log('aaa:', cache.resolve(key, 'hasMore') as string)
    info.partial = !isPostInTheCache

    let hasMore = true
    const results: string[] = []
    fieldInfos.forEach((fi) => {
      //get cache data from query posts({"limit":10})
      const key = cache.resolve(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'posts') as string[]
      const _hasMore = !!cache.resolve(key, 'hasMore')
      if (!_hasMore) {
        hasMore = _hasMore
      }
      //console.log('data:', data)
      //this return the id that the cache know about
      /*
      [
        'Post:19', 'Post:11',
        'Post:12', 'Post:13',
        'Post:14', 'Post:15',
        'Post:16', 'Post:17',
        'Post:18', 'Post:20'
      ]
      */

      //if we do that pagination until the second page, we combine it with the first page
      results.push(...data)
    })

    return {
      __typename: 'PaginatedPosts',
      hasMore,
      posts: results,
    }
  }
}

//invalidate all post
export const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'posts')
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {})
  })
}
