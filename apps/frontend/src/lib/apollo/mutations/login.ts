import { gql } from '@apollo/client'

export const loginMutation = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      jwt
    }
  }
`