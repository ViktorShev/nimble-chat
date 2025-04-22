import { gql } from '@apollo/client'

export const messageCreatedSubscription = gql`
  subscription MessageCreated {
    messageCreated {
      author {
        id
        username
      }
      content
      createdAt
      id
    }
  }
`