export const ALLOWED_CORS_ORIGINS = new RegExp(process.env.ALLOWED_CORS_ORIGINS_REGEX ?? '^http://localhost:3000$')
export const PORT = parseInt(process.env.PORT ?? '3001')