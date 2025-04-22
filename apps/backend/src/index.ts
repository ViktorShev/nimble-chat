import 'reflect-metadata'

import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { ALLOWED_CORS_ORIGINS, PORT } from '~/constants.js'
import { initializeDB } from '~/service-providers/db/index.js'
import { injectCurrentUser } from '~/service-providers/graphql/context.js'
import { createGraphQLServer } from '~/service-providers/graphql/create-server.js'

const startTime = Date.now()

async function startServer () {
  await initializeDB()

  const app = express()
  const httpServer = createServer(app)
  const graphqlServer = await createGraphQLServer(httpServer, '/graphql')

  await graphqlServer.start()

  app.use(
    '/graphql',
    cors({ origin: ALLOWED_CORS_ORIGINS }),
    express.json(),
    express.urlencoded({ extended: true }),
    // @ts-expect-error -- Non-critical type error
    expressMiddleware(graphqlServer, { context: injectCurrentUser }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  )

  console.info(`INFO: Server ready at http://localhost:${PORT}/graphql`)
  console.info(`INFO: CORS enabled for origins: ${ALLOWED_CORS_ORIGINS}`)
  console.info(`INFO: Started in ${Date.now() - startTime}ms`)
}

await startServer()