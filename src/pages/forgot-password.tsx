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
            <div className="pt-16">
              <h2 className="text-center text-xl font-bold">
                Getting back into your account
              </h2>
              <p className="text-center">
                Tell us some information about your account
              </p>
              <Form className="mx-auto px-2 md:w-2/3">
                <InputField
                  name="email"
                  label="Enter your email"
                  type="email"
                ></InputField>
                {responseMessage && (
                  <label className="text-green-400">{responseMessage}</label>
                )}
                <button
                  className="m-auto flex w-1/6 justify-center rounded bg-coral py-1 text-white hover:bg-grape"
                  type="submit"
                >
                  {isSubmitting ? <LoadingIcon /> : null}
                  {isSubmitting ? 'Loading' : 'Continue'}
                </button>
              </Form>
            </div>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
