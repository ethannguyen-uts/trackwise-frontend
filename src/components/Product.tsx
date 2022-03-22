import { useFormik } from 'formik'
import React from 'react'
import {
  ProductFragmentFragment,
  useDeleteProductMutation,
  useUpdateProductTargetPriceMutation,
} from '../generated/graphql'
import LoadingIcon from './layout/LoadingIcon'

interface ProductProps {
  product: ProductFragmentFragment
  onDelete: (name: string) => void
}

export const Product: React.FC<ProductProps> = (props) => {
  const { product } = props
  const [, deleteProduct] = useDeleteProductMutation()
  const [, updateTargetPrice] = useUpdateProductTargetPriceMutation()
  const handleDeleteProduct = () => {
    deleteProduct({ id: product.id })
    props.onDelete(product.name)
  }
  const formik = useFormik({
    initialValues: {
      targetPrice: product.targetPrice,
    },
    onSubmit: (values) => {
      return updateTargetPrice({
        id: product.id,
        targetPrice: values.targetPrice,
      })
    },
  })

  return (
    <div className="sm:flex-column relative flex flex-row flex-wrap justify-center rounded border bg-white shadow-md">
      <button
        onClick={handleDeleteProduct}
        className="absolute left-3 top-3 rounded-sm bg-red-500 px-2 text-sm text-white hover:bg-cherry"
      >
        X
      </button>

      <span
        className={`absolute bottom-3 left-3 rounded-sm p-1 text-sm text-white sm:right-3 sm:bottom-auto sm:left-auto sm:top-3 ${
          product.status === 'dropped'
            ? 'bg-cherry'
            : product.status === 'updated'
            ? 'bg-sky'
            : 'bg-success'
        }`}
      >
        {product.status === 'dropped' ? 'price dropped' : product.status}
      </span>

      <div className="flex basis-1/2 flex-row flex-wrap justify-center rounded p-5 sm:basis-full">
        <img
          className="w-auto basis-10 object-contain sm:max-h-32"
          src={product.imageUrl}
          alt={product.name}
        ></img>
      </div>
      <div className="basis-1/2 px-3 py-2 sm:basis-full">
        <h2 className="mb-2 text-lg font-bold hover:cursor-pointer hover:underline sm:h-20 ">
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            {product.name}
          </a>
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-row flex-wrap"
        >
          <label className="basis-3/4">Scrape price ($): </label>
          <span className="basis-1/4 text-right">{product.scrapePrice}</span>
          <label className="basis-3/4">Current:</label>
          <span className="basis-1/4 text-right">{product.currentPrice}</span>
          <label className="basis-1/2">Target: </label>
          <div className="basis-1/2">
            <input
              className="bg-yellow-100 w-full text-right"
              id="targetPrice"
              name="targetPrice"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.targetPrice}
            />
            <button
              type="submit"
              className="mt-1 flex w-full items-center justify-center rounded-sm bg-coral py-1 px-2 text-xs text-white hover:bg-grape"
            >
              {formik.isSubmitting ? <LoadingIcon /> : null}
              {formik.isSubmitting ? '' : 'Track'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
