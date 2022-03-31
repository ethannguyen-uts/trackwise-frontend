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
import { validatePassword } from '../../utils/fieldValidation'

interface changePasswordProps {
  token: string
}

const ChangePassword: NextPage<changePasswordProps> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const validate = (values: { password?: string }) => {
    const errors: { password?: string } = {}
    const inputPasswordError = validatePassword(values.password!)
    if (inputPasswordError) errors.password = inputPasswordError
    return errors
  }

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validate={validate}
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
            //Token expired
            setTokenError(errorMap.token)
          }
          setErrors(toErrorMap(response.data.changePassword.errors))
          return
        }
        //worked
        if (response.data?.changePassword?.user) {
          setResponseMessage(
            'Your password has been changed. Redirecting to Login...'
          )
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <Form className="mx-2 pt-16">
              <InputField
                name="password"
                label="Please input your new password"
                type="password"
              ></InputField>
              {tokenError && <label className="bg-red-500">{tokenError}</label>}

              <button
                className="m-auto flex w-full justify-center rounded bg-coral py-1 px-2 text-sm text-white hover:bg-grape sm:w-36"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Loading' : 'Change Password'}
              </button>
              {responseMessage && (
                <div className="text-center text-success">
                  {responseMessage}
                </div>
              )}
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
