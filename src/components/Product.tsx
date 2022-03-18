import React from 'react'
import { ProductFragmentFragment } from '../generated/graphql'

interface ProductProps {
  product: ProductFragmentFragment
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="flex-column relative flex flex-wrap justify-center border-2 shadow-md">
      <button className="absolute left-5 top-5 bg-red-400 px-2 hover:bg-red-600">
        X
      </button>
      <div className="flex flex-row flex-wrap justify-center p-5">
        <img
          className="max-h-40 w-auto basis-10 object-contain"
          src={product.imageUrl}
          alt={product.name}
        ></img>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-3 h-20 text-lg font-bold">{product.name}</h2>
        <h3>Scrape price: {product.scrapePrice}</h3>
        <h3>Current price: {product.scrapePrice}</h3>
        <label>Target price: </label>
        <input
          className="w-1/3 bg-yellow-100 text-right"
          type="text"
          value={product.targetPrice}
        />
      </div>
    </div>
  )
}
