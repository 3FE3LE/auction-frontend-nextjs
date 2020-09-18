import React, { useReducer } from 'react'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'

import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_PRODUCT,
  UPDATE_TOTAL
} from '../../types';

const OrderState = ({ children }) => {
  const initialState = {
    client: {},
    products: [],
    total: 0
  }

  const [state, dispatch] = useReducer(OrderReducer, initialState)

  // set client
  const addClient = client => [
    dispatch({
      type: SELECT_CLIENT,
      payload: client
    })
  ]

  // set products
  const addProduct = selectedProducts => {

    let newState;

    if (state.products.length > 0) {
      newState = selectedProducts.map(product => {
        const newProduct = state.products.find(stateProduct => stateProduct.id === product.id)
        return { ...product,... newProduct }
      })
    } else {
      newState = selectedProducts
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState
    })
  }

  const updateAmount = newProduct => {
    dispatch({
      type: QUANTITY_PRODUCT,
      payload: newProduct
    })
  }

  const calcTotal = () => {
    dispatch({
      type: UPDATE_TOTAL
    })
  }

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProduct,
        updateAmount,
        calcTotal
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
export default OrderState;

