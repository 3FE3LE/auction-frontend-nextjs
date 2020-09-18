import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import QUERY from '../../constants/queries'
import Loader from '../Loader'
import { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext'



const SetClient = () => {

  const { data, loading, error } = useQuery(QUERY.getProducts)

  const orderContext = useContext(OrderContext)

  const {addProduct} = orderContext

  const [product, setProduct] = useState([])

  useEffect(() => {
    addProduct(product)
  }, [product])

  if (loading) return (
    <Loader open={loading} />
  )

  const { getProducts } = data;

  const selectProducts = product => {
    setProduct(product);
  }

  return (
    <>
      <p
        className="mt-10 my-2 bg-white-border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      >
        2. Seleccione sus productos del pedido
      </p>
      <Select
        options={getProducts}
        isMulti={true}
        onChange={option => selectProducts(option)}
        getOptionValue={getProducts => getProducts.id}
        getOptionLabel={getProducts => `${getProducts.name} - ${getProducts.quantity} Disponibles`}
        placeholder='Seleccione a un cliente'
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}

export default SetClient