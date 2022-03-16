import React from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { getGraphqlErrors } from '../utils/getGraphQLErrors'

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [{}, register] = useRegisterMutation()

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ data: { ...values } })
        //handle errors
        if (response.error?.graphQLErrors) {
          const graphqlErrors = getGraphqlErrors(response.error?.graphQLErrors)
          if (graphqlErrors) {
            setErrors(graphqlErrors)
            return
          }
        }
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors))
          return
        }
        //worked
        if (response.data?.register.user) {
          router.push('/login')
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <Form>
              <InputField
                name="firstName"
                label="First name"
                type="text"
              ></InputField>
              <InputField
                name="lastName"
                label="Last Name"
                type="text"
              ></InputField>
              <InputField name="email" label="Email" type="text"></InputField>
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
              <button
                className="m-auto flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Loading' : 'Register'}
              </button>
            </Form>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
