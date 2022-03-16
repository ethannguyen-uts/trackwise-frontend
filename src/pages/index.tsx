import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { Wrapper } from '../components/layout/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import Post from '../components/Post'
import Link from 'next/link'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useState } from 'react'

const Home: NextPage = () => {
  const [variables, setVariables] = useState({ limit: 15, cursor: null })
  const [{ data, fetching }] = usePostsQuery({
    variables,
  })

  if (!fetching && !data) {
    return <div>No data</div>
  }

  return (
    <Wrapper>
      <div className="flex flex-row items-center justify-end py-2">
        <Link href="/create-post">Create Post</Link>
      </div>
      {!data && fetching ? (
        <div>Loading</div>
      ) : (
        data!.posts.posts.map((post) => <Post key={post.id} post={post} />)
      )}
      {data && data.posts.hasMore && (
        <button
          onClick={() =>
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].created_at,
            })
          }
          className="mx-auto flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        >
          {fetching ? <LoadingIcon /> : null}
          {fetching ? 'Loading' : 'Load more'}
        </button>
      )}
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
