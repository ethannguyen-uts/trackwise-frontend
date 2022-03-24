import React, { Fragment } from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { useRouter } from 'next/router'

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  const router = useRouter()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
    //now we only do meQuery on browser
    //stop sending request when it is on next js server because when i write this code the nextjs server does not send the cookie, we will add forward cookie to next js server later
  })

  const [, logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
    await router.push('/')
    await router.reload()

    //reload the page
  }
  let body = null
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <Fragment>
        <li className="mr-3 rounded-md bg-muted px-3 py-1 text-sm text-black hover:bg-moon">
          <NextLink href="/login">
            <a className="block no-underline">Login</a>
          </NextLink>
        </li>
        <li className="mr-3 rounded-md bg-coral px-3 py-1 text-sm text-white hover:bg-grape">
          <NextLink href="/register">
            <a className="block no-underline" href="./">
              Sign up
            </a>
          </NextLink>
        </li>
      </Fragment>
    )
  } else {
    body = (
      <Fragment>
        <li className="mr-3 rounded-md bg-muted px-3 py-1 text-sm text-black hover:bg-moon">
          <NextLink href="/login">
            <a className="block no-underline">{data.me.username}</a>
          </NextLink>
        </li>
        <li className="mr-3 rounded-md bg-coral px-3 py-1 text-sm text-white hover:bg-grape">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </Fragment>
    )
  }
  return (
    <nav className="fixed top-0 z-10 flex w-full flex-row items-center justify-between bg-white shadow">
      <div className="ml-3 hover:cursor-pointer">
        <NextLink href="/products">
          <img
            className="h-12 w-full object-contain pt-1.5"
            src="/logo.png"
            alt="logo"
          />
        </NextLink>
      </div>
      <div>
        <ul className="flex flex-row flex-wrap justify-end py-2 ">{body}</ul>
      </div>
    </nav>
  )
}

export default Navbar
