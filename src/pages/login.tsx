import React from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useLoginMutation } from '../generated/graphql'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface registerProps {}

export const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [{}, login] = useLoginMutation()
  const [error, setError] = useState('')

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
        const response = await login({ ...values })
        if (response.data?.login.errors) {
          setError(response.data?.login.errors[0].error as string)
        } else if (response.data?.login.user) {
          //worked
          if (typeof router.query.next === 'string') {
            router.push(router.query.next)
          } else router.push('/')
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <div className="flex h-full w-full flex-row items-center justify-center bg-whitebg px-2">
              <Form className="w-full md:w-8/12">
                <h1 className="text-center text-xl text-grape">Login</h1>
                <InputField
                  name="username"
                  label="Username"
                  type="text"
                ></InputField>
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                ></InputField>
                <div className=" mb-2 block w-full text-right text-sm text-coral hover:underline">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
                {error && <label className="text-red-600">{error}</label>}
                <button
                  className="flex w-full justify-center rounded bg-coral py-1 text-white hover:bg-grape"
                  type="submit"
                >
                  {isSubmitting ? <LoadingIcon /> : null}
                  {isSubmitting ? 'Loading' : 'Login'}
                </button>
              </Form>
            </div>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
