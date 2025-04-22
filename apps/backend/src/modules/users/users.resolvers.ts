import type { IResolvers } from '@graphql-tools/utils'
import { User } from '~/service-providers/db/entities/user.js'
import { resolver } from '~/service-providers/graphql/resolver.js'

export const resolvers: IResolvers = {
  Query: {
    users: resolver(async () => {
      return await User.find()
    }),
    user: resolver<{ id: string }>(async (_parent, { id }) => {
      return await User.findOne({ where: { id } })
    }),
  },
}