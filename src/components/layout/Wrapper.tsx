import { Fragment } from 'react'
import Navbar from './Navbar'

interface WrapperInputProps {}

export const Wrapper: React.FC<WrapperInputProps> = (props) => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="mx-auto mt-8 w-full max-w-6xl">{props.children}</main>
    </Fragment>
  )
}
