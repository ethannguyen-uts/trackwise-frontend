import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { createUrqlClient } from '../utils/createUrqlClient'
import { NextPage } from 'next'
import { Wrapper } from '../components/layout/Wrapper'
import { useAddProductMutation, useProductsQuery } from '../generated/graphql'
import { Product } from '../components/Product'
import { Form, Formik } from 'formik'
import LoadingIcon from '../components/layout/LoadingIcon'
import InputField from '../components/InputField'

const Products: NextPage = ({}) => {
  const [{ data }] = useProductsQuery()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [, addProduct] = useAddProductMutation()
  const handleDeleteProduct = (name: string) => {
    setMessage(`Product ${name} has been deleted!`)
    setTimeout(() => setMessage(''), 3000)
  }
  return (
    <Wrapper>
      <Formik
        initialValues={{
          url: '',
        }}
        onSubmit={async (values) => {
          console.log(values)
          const response = await addProduct({ ...values })
          if (response.error) {
            setError(response.error.graphQLErrors[0].message)
          } else if (response.data?.addProduct) {
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-row content-center items-center justify-center bg-red-200">
              <div className="basis-5/6">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <InputField name="url" type="text" />
                </label>
              </div>
              <button
                className="mx-auto box-border flex w-16 justify-center rounded bg-blue-500 py-2 px-4 text-center text-sm text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? '' : 'Scrape'}
              </button>
            </Form>
          )
        }}
      </Formik>
      {error && (
        <label className="block text-center text-red-600">{error}</label>
      )}
      {message && (
        <label className="block text-center text-blue-400">{message}</label>
      )}
      <div className="mx-10 mt-12 grid grid-cols-1 gap-10  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data
          ? data.products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
              />
            ))
          : null}
      </div>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Products)
