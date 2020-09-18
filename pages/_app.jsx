import client from '../config/apollo'
import { ApolloProvider } from '@apollo/client'
import OrderState from '../context/orders/OrderState'


const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <OrderState>
      <Component {...pageProps} />
    </OrderState>
  </ApolloProvider>
)

export default MyApp;