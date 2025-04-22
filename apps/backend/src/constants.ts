export const ALLOWED_CORS_ORIGINS = new RegExp(process.env.ALLOWED_CORS_ORIGINS_REGEX ?? '^http://localhost:3000$')
export const PORT = parseInt(process.env.PORT ?? '3001')
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? '10')
export const JWT_SECRET = process.env.JWT_SECRET ?? 'nimble_chat_jwt_secret'

export const DB_CONFIG = {
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'admin',
  password: process.env.DB_PASSWORD ?? 'pass',
  database: process.env.DB_NAME ?? 'nimble_chat',
}