import React from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [{}, login] = useLoginMutation()
  const [error, setError] = useState('')

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({ ...values })
        if (response.data?.login.errors) {
          setError(response.data?.login.errors[0].error as string)
        } else if (response.data?.login.user) {
          //worked
          router.push('/')
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <Form>
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
              {error && <label className="text-red-600">{error}</label>}
              <button
                className="flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Loading' : 'Login'}
              </button>
            </Form>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default Register
