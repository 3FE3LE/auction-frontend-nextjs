import client from '../config/apollo'
import {ApolloProvider} from '@apollo/client'

const MyApp = ({Component, pageProps}) =>{
    console.log("_app.jsx!!")
    return(
        <ApolloProvider client={client}>
            <Component { ...pageProps}/>
        </ApolloProvider>
    )
}

export default MyApp;