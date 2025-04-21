import type { Disposable } from 'graphql-ws'

interface ApolloWsServerDisposePlugin {
  serverWillStart: () => Promise<{ drainServer: () => Promise<void> }>
}

export const apolloWsServerDisposePlugin = (wsServerCleanUp: Disposable): ApolloWsServerDisposePlugin => {
  return {
    async serverWillStart () {
      return {
        async drainServer () {
          await wsServerCleanUp.dispose()
        },
      }
    },
  }
}
