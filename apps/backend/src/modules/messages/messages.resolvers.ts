import type { IResolvers } from '@graphql-tools/utils'
import { Message } from '~/service-providers/db/entities/message.js'
import { pubsub, PubSubTopic } from '~/service-providers/graphql/pubsub.js'
import type { DefaultParent } from '~/service-providers/graphql/resolver.js'
import { resolver } from '~/service-providers/graphql/resolver.js'
import { subscriptionResolver } from '~/service-providers/graphql/subscription-resolver.js'


export const resolvers: IResolvers = {
  Query: {
    messages: resolver(async () => {
      const messages = await Message.find({ relations: { createdByUser: true } })

      if (!messages) {
        return []
      }

      return messages.map(msg => ({ ...msg, author: msg.createdByUser }))
    }),
  },
  Mutation: {
    createMessage: resolver<{ content: string }>(
      async (_parent, { content }, { user }) => {
        const message = await Message.create({
          content,
          createdByUser: user,
        }).save()

        pubsub.publish(PubSubTopic.MESSAGE_CREATED, { ...message, author: user })

        return { ...message, author: user }
      },
    ),
  },
  Subscription: {
    messageCreated: subscriptionResolver(PubSubTopic.MESSAGE_CREATED),
  },
  User: {
    messages: resolver<any, DefaultParent>(async (user) => {
      const messages = await Message.find({ where: { createdByUser: { id: user.id } }, relations: { createdByUser: true } })

      if (!messages) {
        return []
      }

      return messages.map(msg => ({ ...msg, author: msg.createdByUser }))
    }),
  },
}