import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'

const Home: NextPage = () => {
  return (
    <Wrapper>
      {' '}
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        Hello world
      </div>
    </Wrapper>
  )
}

export default Home
