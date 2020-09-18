import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext'

const ProductResume =({ product })=> {

  const {updateAmount, calcTotal} = useContext(OrderContext)
  
  const [amount, setAmount] = useState(0)

  const {name, quantity, price} = product;

  const updateQuantity = () =>  {
    const newProduct = {...product, amount: Number(amount)}
    updateAmount(newProduct)
  }
  
  useEffect(() => {
    updateQuantity()
    calcTotal()
  }, [amount])

  return (
    <>
      <div className="md:flex">
        <div className="md:w-2/4">
          <p className="text-sm">{name}</p>
          <p>$ {price}</p>
        </div>
        <input 
          type="number" 
          max={quantity}
          onChange={e => setAmount(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"/>
      </div>
    </>
  )
}

export default ProductResume
