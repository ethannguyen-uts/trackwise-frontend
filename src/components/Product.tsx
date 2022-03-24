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
      <div className="basis-1/2 py-2 sm:basis-full sm:px-3">
        <span className="text-xs">
          Last update: {new Date(product.updated_at).toLocaleString()}
        </span>
        <h2 className="mb-2 font-serif text-lg font-bold hover:cursor-pointer hover:underline sm:h-20">
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            {product.name}
          </a>
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="mx-1 flex flex-row flex-wrap"
        >
          <label className="basis-full font-serif">
            Original price: AUD {product.scrapePrice}
          </label>

          <label className="basis-full font-serif">
            Current Price: AUD {product.currentPrice}
          </label>
          <label className="basis-auto  font-serif">Target Price: &nbsp;</label>
          <div className="text-right font-serif">
            <label>AUD&nbsp;</label>
            <input
              className="w-16 border-2 border-solid border-sky bg-moon px-1 text-left"
              id="targetPrice"
              name="targetPrice"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.targetPrice}
            />
          </div>
          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center rounded-sm bg-coral py-1 px-2 text-xs text-white hover:bg-grape"
          >
            {formik.isSubmitting ? <LoadingIcon /> : null}
            {formik.isSubmitting
              ? ''
              : product.status === 'scrapped'
              ? 'Track price'
              : 'Get Latest Price'}
          </button>
        </form>
      </div>
    </div>
  )
}
