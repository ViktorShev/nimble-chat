'use client'

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'
import { link } from './links'

export function makeClient () {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })
}

export function ApolloProvider ({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}