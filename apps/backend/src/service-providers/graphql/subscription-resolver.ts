import type { PubSubTopic, PubSubTopicPayload } from './pubsub.js'
import { pubsub } from './pubsub.js'

export interface SubscriptionResolver<TPayload> {
  resolve: (payload: TPayload) => any
  subscribe: () => AsyncIterator<TPayload, any, undefined>
}

export function subscriptionResolver<Topic extends PubSubTopic> (
  topic: Topic | Topic[],
  resolve?: (payload: PubSubTopicPayload[Topic]) => any,
): SubscriptionResolver<PubSubTopicPayload[Topic]> {
  return {
    resolve: resolve ?? ((payload) => payload),
    subscribe: () => pubsub.asyncIterableIterator(topic),
  }
}
