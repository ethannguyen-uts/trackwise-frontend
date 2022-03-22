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
        className=" flex w-full flex-row content-center items-center justify-center pt-16"
        onSubmit={formik.handleSubmit}
      >
        <div className="basis-5/6">
          <label className="relative block">
            <span className="sr-only">Scrape</span>
            <input
              type="text"
              className="form-control w-full appearance-none rounded-l border-2 border-moon bg-moon py-1.5 px-3 leading-tight focus:border-coral focus:bg-white focus:outline-none"
              placeholder="Enter product url ..."
              aria-label="Scrape"
              aria-describedby="button-addon3"
              name="url"
              id="url"
              onChange={formik.handleChange}
              value={formik.values.url}
            />
          </label>
        </div>
        <button
          className="box-border flex w-16 justify-center rounded-r bg-sky py-2 px-4 text-center text-sm text-white hover:bg-blueberry"
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
        <label className="text-blue-400 block text-center">{message}</label>
      )}
      <div className="mx-10 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
