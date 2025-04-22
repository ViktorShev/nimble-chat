import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { loadFiles } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { useServer } from 'graphql-ws/use/ws'
import type { Server } from 'http'
import { WebSocketServer } from 'ws'
import { apolloWsServerDisposePlugin } from './plugins/apollo-ws-server-dispose.js'

export async function createGraphQLServer (httpServer: Server, gqlPath: string = '/graphql') {
  const typeDefs = await loadFiles('**/*.graphql')
  const resolvers = await loadFiles('**/*.resolvers.ts')

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const wsServer = new WebSocketServer({ server: httpServer, path: gqlPath })
  const wsServerCleanup = useServer({ schema }, wsServer)
  
  const graphqlServer = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      apolloWsServerDisposePlugin(wsServerCleanup),
    ],
  })

  httpServer.on('close', () => {
    wsServer.close()
  })

  return graphqlServer
}