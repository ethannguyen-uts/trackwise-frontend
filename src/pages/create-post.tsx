import React from 'react'
import { Formik, Form } from 'formik'
import InputField from '../components/InputField'
import { Wrapper } from '../components/layout/Wrapper'
import LoadingIcon from '../components/layout/LoadingIcon'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useCreatePostMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { getGraphqlErrors } from '../utils/getGraphQLErrors'
import { useIsAuth } from '../hooks/useIsAuth'

interface registerProps {}

const CreatePost: React.FC<registerProps> = ({}) => {
  const [, createPost] = useCreatePostMutation()
  const router = useRouter()
  useIsAuth()

  return (
    <Formik
      initialValues={{
        title: '',
        text: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await createPost({ input: { ...values } })
        //handle errors
        if (response.error?.graphQLErrors) {
          const graphqlErrors = getGraphqlErrors(response.error?.graphQLErrors)
          if (graphqlErrors) {
            setErrors(graphqlErrors)
            return
          }
        }
        //back to the home page
        if (response.data?.createPost) router.push('/')
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper>
            <Form>
              <InputField name="title" label="Title" type="text"></InputField>
              <InputField
                name="text"
                label="Text"
                istextarea="true"
                cols={30}
                rows={5}
              ></InputField>
              <button
                className="m-auto flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Loading' : 'Create Post'}
              </button>
            </Form>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
