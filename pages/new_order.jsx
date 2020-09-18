import React from 'react'
import AdminLayout from '../components/layouts/AdminLayout'
import SetClient from '../components/Orders/SetClient'
import SetProducts from '../components/Orders/SetProducts'
import OrderResume from '../components/Orders/OrderResume'
import OrderTotal from '../components/Orders/OrderTotal'
import { useContext } from 'react'
import OrderContext from '../context/orders/OrderContext'



const NewOrder = () => {

  const {client, products, total} = useContext(OrderContext)

  // console.log(client, products, total)

  const orderValidation = () => {
    // console.log('hola aqui esta l pauta validacion')
    console.log(total, client, products)
    return !products.every( product => (product.amount > 0 || total > 0 || client.length > 0 )) ? 'opacity-50 cursor-not-allowed' : ''
  }

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl text-gray-800 font-light">
          Nuevo Pedido
        </h1>
        <div className="flex justify-center my-5">
          <div className="w-full max-w-lg">
            <SetClient />
            <SetProducts />
            <OrderResume />
            <OrderTotal />
            <button
              type="button"
              className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold  hover:bg-gray-900 ${orderValidation()}`}
            >
              Registrar pedido
            </button>
          </div>
        </div>
      </AdminLayout>
    </> 
  )
}

export default NewOrder
