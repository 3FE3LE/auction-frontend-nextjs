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
  `
}

export default QUERY