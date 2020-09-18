import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import QUERY from '../../constants/queries'
import Loader from '../Loader'
import { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext'



const SetClient = () => {

  const { data, loading, error } = useQuery(QUERY.getClientsByUser)

  const orderContext = useContext(OrderContext)

  const {addClient} = orderContext

  const [client, setClient] = useState({})

  useEffect(() => {
    addClient(client)
  }, [client])

  if (loading) return (
    <Loader open={loading} />
  )

  const { getClientsByUser } = data;

  const selectClient = client => {
    setClient(client);
  }

  return (
    <>
      <p
        className="mt-10 my-2 bg-white-border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      >
        1. Asigne un cliente al pedido
      </p>
      <Select
        options={getClientsByUser}
        onChange={option => selectClient(option)}
        getOptionValue={getClientsByUser => getClientsByUser.id}
        getOptionLabel={getClientsByUser => getClientsByUser.name}
        placeholder='Seleccione a un cliente'
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}

export default SetClient

