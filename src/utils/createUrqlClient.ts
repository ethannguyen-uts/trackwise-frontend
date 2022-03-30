import { dedupExchange, fetchExchange, Exchange } from 'urql'
import { Cache, cacheExchange } from '@urql/exchange-graphcache'
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  DeleteProductMutationVariables,
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
    cookie = ctx?.req?.headers.cookie
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: 'include',
      headers: cookie ? { cookie } : undefined, //forward cookie to nextjs server for SSR rendering
    } as const,

    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {},
        //client side resolver will run whenever the query runs
        resolvers: {
          Query: {},
        },
        updates: {
          Mutation: {
            addProduct: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields('Query')
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === 'products'
              )
              fieldInfos.forEach((fi) => {
                cache.invalidate('Query', 'products', fi.arguments)
              })
            },

            deleteProduct: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: 'Product',
                id: (args as DeleteProductMutationVariables).id,
              })
            },

            logout: (_result, _args, cache, _info) => {
              typeUpdateQueryFn<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            login: (_result, _args, cache, _info) => {
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
                invalidateAllProducts(cache)
            },
            register: (_result, _args, cache, _info) => {
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

//invalidate all products
export const invalidateAllProducts = (cache: Cache) => {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'products')
  fieldInfos.forEach((fi) => {
    console.log(fi)
    cache.invalidate('Query', 'products', fi.arguments || {})
  })
}
