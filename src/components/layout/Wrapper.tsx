import { Fragment } from 'react'
import Navbar from './Navbar'

interface WrapperInputProps {}

export const Wrapper: React.FC<WrapperInputProps> = (props) => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="bg-blue mx-auto h-screen w-full max-w-6xl bg-whitebg">
        {props.children}
      </main>
    </Fragment>
  )
}
