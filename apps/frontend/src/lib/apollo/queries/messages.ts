import { gql } from '@apollo/client'

export const messagesQuery = gql`
  query Messages {
    messages {
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