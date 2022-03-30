import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useForgotPasswordMutation } from '../generated/graphql'
import { useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { validateEmail } from '../utils/fieldValidation'
interface registerProps {}

export const ForgotPassword: React.FC<registerProps> = () => {
  const [{}, forgotPasswordMutation] = useForgotPasswordMutation()
  const [responseMessage, setResponseMessage] = useState('')
  const [showInputForm, setShowInputForm] = useState(true)

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
          setShowInputForm(false)
        }
      }}
      validate={(values) => {
        const errors: { email?: string } = {}
        const emailError = validateEmail(values.email)
        if (emailError) errors.email = emailError
        return errors
      }}
    >
      {({ isSubmitting, values }) => {
        return (
          <Wrapper>
            <div className="pt-16">
              <h2 className="text-center text-xl font-bold">
                Getting back into your account
              </h2>

              {showInputForm && (
                <Fragment>
                  <p className="text-center">
                    Tell us some information about your account
                  </p>
                  <Form className="mx-auto px-2 md:w-2/3">
                    <InputField
                      name="email"
                      label="Enter your email"
                      type="email"
                    ></InputField>

                    {!validateEmail(values.email) && (
                      <button
                        className="m-auto flex w-full justify-center rounded bg-coral py-1 text-white hover:bg-grape sm:w-1/6"
                        type="submit"
                      >
                        {isSubmitting ? <LoadingIcon /> : null}
                        {isSubmitting ? 'Loading' : 'Continue'}
                      </button>
                    )}
                  </Form>
                </Fragment>
              )}
              {responseMessage && (
                <div className="text-center text-success">
                  {responseMessage}
                </div>
              )}
            </div>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
