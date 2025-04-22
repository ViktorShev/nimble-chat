import { HttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

export const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include', 
})

export const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3001/graphql',
  connectionParams: {
    credentials: 'include',
  },
}))

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

export const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('jwt')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
  }
})

export const link = authLink.concat(splitLink)