import React from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { useMutation } from 'urql'

interface registerProps {}

const REGISTER_MUTATION: string = `mutation Register($data: RegisterInput!) {
    register(data: $data) {
      firstName,
      lastName, 
      username,
      name,
      email
    }
  }`

export const Register: React.FC<registerProps> = ({}) => {
  const [{}, register] = useMutation(REGISTER_MUTATION)

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        const response = await register(values)
      }}
    >
      {({ isSubmitting, handleChange }) => {
        return (
          <Wrapper>
            <Form>
              <InputField
                name="firstname"
                label="First name"
                type="text"
              ></InputField>
              <InputField name="lastname" label="Last" type="text"></InputField>
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
                className="flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
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

export default Register
