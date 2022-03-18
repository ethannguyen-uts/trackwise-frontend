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
    <div className="flex-column relative flex flex-wrap justify-center border-2 shadow-md">
      <button
        onClick={handleDeleteProduct}
        className="absolute left-3 top-3 rounded-sm bg-red-400 px-2 text-sm text-white hover:bg-red-600"
      >
        X
      </button>

      <span
        className={`absolute right-3 top-3 rounded-sm px-1 text-sm text-white ${
          product.status === 'dropped'
            ? 'bg-green-500'
            : product.status === 'updated'
            ? 'bg-blue-400'
            : 'bg-red-400'
        }`}
      >
        {product.status}
      </span>

      <div className="flex flex-row flex-wrap justify-center p-5">
        <img
          className="max-h-40 w-auto basis-10 object-contain"
          src={product.imageUrl}
          alt={product.name}
        ></img>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 h-20 text-lg font-bold hover:cursor-pointer hover:underline">
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            {product.name}
          </a>
        </h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-4 gap-1">
          <label className="col-span-2">Scrape price: </label>
          <span className="text-right">{product.scrapePrice}</span>
          <span className="col-span-2">Current price:</span>
          <span className="text-right">{product.currentPrice}</span>
          <label className="col-span-2">Target ($): </label>
          <input
            className="bg-yellow-100 text-right"
            id="targetPrice"
            name="targetPrice"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.targetPrice}
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-sm bg-blue-400 px-2 text-xs text-white hover:bg-blue-600"
          >
            {formik.isSubmitting ? <LoadingIcon /> : null}
            {formik.isSubmitting ? '' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}
