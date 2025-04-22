import { gql } from '@apollo/client'

export const createMessageMutation = gql`
  mutation Mutation($content: String!) {
    createMessage(content: $content) {
      id
      createdAt
      content
      author {
        id
        username
      }
    }
  }
`