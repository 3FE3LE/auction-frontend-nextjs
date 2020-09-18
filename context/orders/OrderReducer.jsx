import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_PRODUCT,
  UPDATE_TOTAL
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      }
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload
      }
    case QUANTITY_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? product = action.payload: product)
      }
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products.reduce( (newTotal, article) => newTotal += article.price * article.amount, 0)
      }


    //   break;

    default:
      return state
  }
}