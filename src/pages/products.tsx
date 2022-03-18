import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { createUrqlClient } from '../utils/createUrqlClient'
import { NextPage } from 'next'
import { Wrapper } from '../components/layout/Wrapper'
import { useAddProductMutation, useProductsQuery } from '../generated/graphql'
import { Product } from '../components/Product'
import SearchBar from '../components/layout/SearchBar'
import { Form, Formik } from 'formik'
import LoadingIcon from '../components/layout/LoadingIcon'
import InputField from '../components/InputField'

const Products: NextPage = ({}) => {
  const [{ data }] = useProductsQuery()
  const [error, setError] = useState('')
  const [, addProduct] = useAddProductMutation()
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
        {({ isSubmitting, values, handleChange }) => {
          return (
            <Form className="flex flex-row content-center items-center justify-center bg-red-200">
              <div className="basis-5/6">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <InputField name="url" type="text" />
                </label>
              </div>
              <button
                className="m-auto flex rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? <LoadingIcon /> : null}
                {isSubmitting ? 'Scrapping' : 'Scrape'}
              </button>
            </Form>
          )
        }}
      </Formik>
      {error && <label className="text-red-600">{error}</label>}
      <div className="mx-10 mt-12 grid grid-cols-1 gap-10  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data
          ? data.products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : null}
      </div>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Products)
