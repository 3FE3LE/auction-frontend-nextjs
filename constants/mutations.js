import { gql } from '@apollo/client'

const MUTATION = {
  newUser: gql`
    mutation newUser($input: UserInput){
      newUser(input:$input){
        id
        name
        lastName
        email
        created_at
      }
    }
  `,
  authUser: gql`
    mutation authUser($input: AuthInput){
      authUser(input:$input){
        token
      }
    }
  `,
  newClient: gql`
    mutation newClient($input: ClientInput){
      newClient(input: $input){
        id
        name
        lastName
        email
        company
        cellphone
      }
    }
  `,
  deleteClient: gql`
    mutation deleteClient($id: ID){
      deleteClient(id: $id){
        id
        name
        email
      }
    }
  `,
  updateClient: gql `
    mutation updateClient($id: ID, $input: ClientInput){
      updateClient(id:$id, input: $input){
        id
        name
        lastName
        company
        email
      }
    }
  `
}

export default MUTATION