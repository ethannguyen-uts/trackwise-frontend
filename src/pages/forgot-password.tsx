import React from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useForgotPasswordMutation } from '../generated/graphql'
import { useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface registerProps {}

export const ForgotPassword: React.FC<registerProps> = () => {
  const [{}, forgotPasswordMutation] = useForgotPasswordMutation()
  const [responseMessage, setResponseMessage] = useState('')

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={async (values) => {
        const response = await forgotPasswordMutation({ ...values })
        if (response.error) {
          setResponseMessage('Unexpected error')
        } else if (response.data?.forgotPassword) {
          //worked
          setResponseMessage(
            'An email has been sent to you, please follow the instruction email to change your Password.'
          )
        }
      }}
      validate={(values) => {
        const errors: { email?: string } = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <Form>
              <InputField name="email" label="Email" type="email"></InputField>
              {responseMessage && (
                <label className="text-green-400">{responseMessage}</label>
              )}
              <button
                className="flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Loading' : 'Send Email'}
              </button>
            </Form>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
