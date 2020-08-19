import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import fetch from 'node-fetch';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: HttpLink({
        uri: 'https://auction-backend-gql.herokuapp.com/',
        fetch
    })
})

export default client;