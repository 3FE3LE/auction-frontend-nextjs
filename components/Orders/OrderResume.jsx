import React from 'react'
import { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext'
import ProductResume from './ProductResume'

const OrderResume = () => {

  const { products } = useContext(OrderContext)

  return (
    <>
      <p
        className="mt-10 my-2 bg-white-border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      >
        3.Resumen del pedido
      </p>
      {products.length > 0 ?
        products.map(product => (
          <ProductResume key={product.id} product={product} />
        )) :
        <p>No hay productos</p>
      }
    </>
  )
}

export default OrderResume
