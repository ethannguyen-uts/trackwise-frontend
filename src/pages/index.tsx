import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { Wrapper } from '../components/layout/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useRouter } from 'next/router'
import { useMeQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const [{ data }] = useMeQuery()
  const router = useRouter()
  return (
    <Wrapper>
      <div className="flex h-full flex-col flex-wrap content-center items-center justify-center pt-16">
        <h1 className="mb-5 text-center font-serif text-6xl font-bold">
          Shop and save money with On Track
        </h1>
        <h2 className="mx-2 font-serif">
          On Track sets an alert on your favourite product & notifies you when
          prices drop.
        </h2>
        <button
          onClick={() => {
            if (data?.me) router.push('./products')
            else router.push('./login')
          }}
          className="mt-3 box-border flex justify-center rounded bg-sky py-1 px-4 text-center text-sm text-white hover:bg-blueberry"
          type="submit"
        >
          Getting Started
        </button>
        <div className="mt-20 flex flex-col">
          <h2 className="text-center font-serif text-2xl">Brand</h2>
          <div className="rounded bg-red-200 p-2">
            <img
              alt="Woolworths brand"
              className="h-16 w-full object-contain"
              src="https://cdn0.woolworths.media/content/content/icon-header-logo.png"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
