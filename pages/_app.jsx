import client from '../config/apollo'
import { ApolloProvider } from '@apollo/client'
import OrderState from '../context/orders/OrderState'
import '../styles.css'


export default function MyApp  ({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <OrderState>
      <Component {...pageProps} />
    </OrderState>
  </ApolloProvider>
}