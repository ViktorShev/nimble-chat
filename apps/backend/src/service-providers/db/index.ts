import { DataSource } from 'typeorm'
import { env } from '~/env.js'
import { Message } from './entities/message.js'
import { User } from './entities/user.js'

export const db = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Message],
  synchronize: env.NODE_ENV !== 'production',
  logging: env.NODE_ENV !== 'production',
})

export async function initializeDB () {
  try {
    await db.initialize()
    console.info('INFO: Database initialized')
  } catch (error) {
    console.error('ERROR: Failed to initialize database', error)
    throw error
  }
}