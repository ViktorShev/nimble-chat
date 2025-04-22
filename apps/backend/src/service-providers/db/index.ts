import { DataSource } from 'typeorm'
import { DB_CONFIG } from '~/constants.js'
import { Message } from './entities/message.js'
import { User } from './entities/user.js'

export const db = new DataSource({
  type: 'postgres',
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
  entities: [User, Message],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
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