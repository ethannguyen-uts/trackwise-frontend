import { Fragment } from 'react'
import Navbar from './Navbar'

interface WrapperInputProps {}

export const Wrapper: React.FC<WrapperInputProps> = (props) => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="max-full mx-auto h-screen bg-whitebg">
        <div className="mx-auto h-full max-w-6xl bg-whitebg">
          {props.children}
        </div>
      </main>
    </Fragment>
  )
}
