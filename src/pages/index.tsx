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
      <div className="flex h-full flex-col content-center items-center justify-center pt-16">
        <div className="mx-2 flex h-4/6 flex-col content-center justify-center">
          <h1 className="text-center font-serif text-3xl font-bold sm:text-6xl">
            Shop and save money with
          </h1>
          <h1 className="mb-5 text-center font-serif text-3xl font-bold text-coral sm:text-6xl">
            Track Wise
          </h1>
          <h2 className="mx-2 text-center font-serif text-lg sm:text-xl">
            Track Wise sets an alert on your favourite product & notifies you
            when prices drop.
          </h2>
          <button
            onClick={() => {
              if (data?.me) router.push('./products')
              else router.push('./login')
            }}
            className="mx-auto mt-3 box-border w-32 rounded bg-coral py-1 px-1 text-center text-sm text-white hover:bg-grape"
            type="submit"
          >
            Getting Started
          </button>
        </div>

        <div className="mt-20 flex flex-col">
          <h2 className="text-center font-serif text-lg sm:text-xl">
            Supported Store
          </h2>
          <div className="rounded bg-red-300 p-2">
            <img
              alt="Woolworths brand"
              className="h-14 w-full object-contain"
              src="https://cdn0.woolworths.media/content/content/icon-header-logo.png"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
