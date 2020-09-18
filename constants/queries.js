import { gql } from '@apollo/client'

const QUERY = {
  getClientsByUser: gql`
    query getClientsByUser{
      getClientsByUser{
        id
        name
        lastName
        email
        company
      }
    }
  `,
  getUser: gql`
    query getUser{
      getUser{
        id
        name
        lastName
        email
      }
    }
  `,
  getClientById: gql`
    query getClientById($id: ID!){
      getClientById(id: $id){
        id
        name
        lastName
        company
        email
        cellphone
      }
    }
  `,
  getProducts: gql`
    query getProducts{
      getProducts{
        id
        name
        quantity
        price
        created_at
      }
    }
  `,
  getProductById: gql `
    query getProductById($id: ID!){
      getProductById(id: $id){
        id
        name
        quantity
        price
        created_at
      }
    }
  `
}

export default QUERY