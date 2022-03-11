import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { Wrapper } from '../components/layout/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery()
  return (
    <Wrapper>
      <div className="flex flex-row items-center justify-center py-2">
        Hello world
      </div>
      {!data ? (
        <div>Loading</div>
      ) : (
        data.posts.map((item) => <div key={item.id}>{item.title}</div>)
      )}
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
