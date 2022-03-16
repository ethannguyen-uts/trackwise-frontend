import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import router from 'next/router'
import { useState } from 'react'
import InputField from '../../components/InputField'
import LoadingIcon from '../../components/layout/LoadingIcon'
import { Wrapper } from '../../components/layout/Wrapper'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { getGraphqlErrors } from '../../utils/getGraphQLErrors'
import { toErrorMap } from '../../utils/toErrorMap'

interface changePasswordProps {
  token: string
}

const ChangePassword: NextPage<changePasswordProps> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({
          data: { password: values.password, token },
        })

        //handle errors
        if (response.error?.graphQLErrors) {
          const graphqlErrors = getGraphqlErrors(response.error?.graphQLErrors)
          if (graphqlErrors) setErrors(graphqlErrors)
          return
        }
        console.log(response.data?.changePassword?.errors)
        if (response.data?.changePassword?.errors) {
          const errorMap = toErrorMap(response.data.changePassword.errors)
          if ('token' in errorMap) {
            setTokenError(errorMap.token)
          }
          setErrors(toErrorMap(response.data.changePassword.errors))
          return
        }
        //worked
        if (response.data?.changePassword?.user) {
          router.push('/login')
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <Form>
              <InputField
                name="password"
                label="Password"
                type="password"
              ></InputField>
              {tokenError && <label className="bg-red-500">{tokenError}</label>}
              <button
                className="m-auto flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Loading' : 'Change Password'}
              </button>
            </Form>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
