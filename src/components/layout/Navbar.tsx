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
    router.reload()
    //reload the page
  }
  let body = null
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <Fragment>
        <li className="mr-3 hover:bg-zinc-300">
          <NextLink href="/login">
            <a className="block no-underline">Login</a>
          </NextLink>
        </li>
        <li className="mr-3 hover:bg-zinc-300">
          <NextLink href="/register">
            <a className="block no-underline" href="./">
              Register
            </a>
          </NextLink>
        </li>
      </Fragment>
    )
  } else {
    body = (
      <Fragment>
        <li className="mr-3 hover:bg-zinc-300">
          <NextLink href="/me">
            <a className="block no-underline">{data.me.username}</a>
          </NextLink>
        </li>
        <li className="mr-3 hover:bg-zinc-300">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </Fragment>
    )
  }
  return (
    <nav>
      <ul className="flex flex-row flex-wrap justify-end bg-yellow-300 py-4">
        {body}
      </ul>
    </nav>
  )
}

export default Navbar
