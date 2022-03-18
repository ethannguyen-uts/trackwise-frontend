import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { createUrqlClient } from '../utils/createUrqlClient'
import { NextPage } from 'next'
import { Wrapper } from '../components/layout/Wrapper'
import { useAddProductMutation, useProductsQuery } from '../generated/graphql'
import { Product } from '../components/Product'
import { useFormik } from 'formik'
import LoadingIcon from '../components/layout/LoadingIcon'

const Products: NextPage = ({}) => {
  const [{ data }] = useProductsQuery()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [, addProduct] = useAddProductMutation()
  const formik = useFormik({
    initialValues: {
      url: '',
    },
    onSubmit: async (values) => {
      console.log(values)
      setError('')
      const response = await addProduct({ ...values })
      if (response.error) {
        setError(response.error.graphQLErrors[0].message)
      } else if (response.data?.addProduct) {
      }
    },
  })

  const handleDeleteProduct = (name: string) => {
    setMessage(`Product ${name} has been deleted!`)
    setTimeout(() => setMessage(''), 3000)
  }
  return (
    <Wrapper>
      <form
        className="flex flex-row content-center items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="basis-5/6">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <input
              type="text"
              className="form-control relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              name="url"
              id="url"
              onChange={formik.handleChange}
              value={formik.values.url}
            />
          </label>
        </div>
        <button
          className="mx-auto box-border flex w-16 justify-center rounded bg-blue-500 py-2 px-4 text-center text-sm text-white hover:bg-blue-700"
          type="submit"
        >
          {formik.isSubmitting ? <LoadingIcon /> : null}
          {formik.isSubmitting ? '' : 'Scrape'}
        </button>
      </form>

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
