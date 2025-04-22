import { PubSub } from 'graphql-subscriptions'
import type { User } from '~/service-providers/db/entities/user.js'

export enum PubSubTopic {
  MESSAGE_CREATED = 'MESSAGE_CREATED',
}

export interface PubSubTopicPayload {
  [PubSubTopic.MESSAGE_CREATED]: { content: string, author: User }
}

export const pubsub = new PubSub()
