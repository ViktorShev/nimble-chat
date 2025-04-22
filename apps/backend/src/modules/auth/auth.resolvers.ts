import type { IResolvers } from '@graphql-tools/utils'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '~/env.js'
import { User } from '~/service-providers/db/entities/user.js'
import { resolver } from '~/service-providers/graphql/resolver.js'

export const resolvers: IResolvers = {
  Mutation: {
    logIn: resolver<{ username: string, password: string }>(
      async (_parent, { username, password }, ctx) => {
        const user = await User.findOne({ where: { username } })
        if (!user) throw new Error('User not found')

        const hashMatches = await bcrypt.compare(password, user.password)
        if (!hashMatches) throw new Error('Invalid password')

        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '1h' })

        ctx.res.cookie('jwt', token, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000), 
        })

        return { jwt: token }
      }, 
      true,
    ),
    signUp: resolver<{ username: string, password: string }>(
      async (_parent, { username, password }, ctx) => {
        const existingUser = await User.findOne({ where: { username } })
        if (existingUser) throw new Error('Username is taken')

        const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS)
        const user = await User.create({ username, password: hashedPassword }).save()

        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '1h' })

        ctx.res.cookie('jwt', token, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000), 
        })

        return { jwt: token }
      }, 
      true,
    ),
  },
}