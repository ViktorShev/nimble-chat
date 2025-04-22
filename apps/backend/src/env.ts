import { z } from 'zod'

const envSchema = z.object({
  ALLOWED_CORS_ORIGINS_REGEX: z.string().min(1).transform(val => new RegExp(val)),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  SALT_ROUNDS: z.string().regex(/^\d+$/).transform(Number),
  JWT_SECRET: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production']).optional().default('development'),
})

export const env = await envSchema.parseAsync(process.env)
