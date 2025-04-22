import type { expressMiddleware } from '@apollo/server/express4'
import jwt from 'jsonwebtoken'
import type { JWTPayload } from '~/common/types.js'
import { env } from '~/env.js'
import { User } from '../db/entities/user.js'

export const injectCurrentUser: Parameters<typeof expressMiddleware>[1]['context'] = async ({ req }) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return { user: null }
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { user: null }
  }

  const token = authHeader.slice(7)

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload
    const user = await User.findOne({ where: { id: payload.userId } })

    if (!user) {
      return { user: null }
    }

    return { user }
  } catch {
    return { user: null }
  }
}