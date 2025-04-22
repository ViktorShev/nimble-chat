import type { expressMiddleware } from '@apollo/server/express4'
import jwt from 'jsonwebtoken'
import type { JWTPayload } from '~/common/types.js'
import { env } from '~/env.js'
import { User } from '../db/entities/user.js'

export const injectContext: Parameters<typeof expressMiddleware>[1]['context'] = async ({ req, res }) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return { user: null, res }
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { user: null, res }
  }

  const token = authHeader.slice(7)

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload
    const user = await User.findOne({ where: { id: payload.userId } })

    if (!user) {
      return { user: null, res }
    }

    return { user, res }
  } catch {
    return { user: null, res }
  }
}