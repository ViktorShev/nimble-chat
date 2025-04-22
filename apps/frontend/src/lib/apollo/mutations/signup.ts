import { gql } from '@apollo/client'

export const signUpMutation = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      jwt
    }
  }
`