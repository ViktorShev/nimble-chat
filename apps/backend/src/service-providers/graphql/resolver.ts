import type { Response } from 'express'
import { GraphQLError, type GraphQLResolveInfo } from 'graphql'

export interface User {
  id: string
  username: string
}

type Resolver<TArgs, TParent extends DefaultParent = DefaultParent, TContext = any, TReturn = any> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TReturn>

type TypedResolver<TArgs, TParent extends DefaultParent = DefaultParent, TContext = any, TReturn = any> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TReturn>

export interface DefaultParent {
  id: string
}

export type DefaultArgs = Record<string, any>

export interface DefaultContext {
  user: User
  res: Response
}

export function resolver<TArgs extends DefaultArgs = DefaultArgs, TParent extends DefaultParent = DefaultParent, TContext extends DefaultContext = DefaultContext, TReturn = any> (
  resolverFn: Resolver<TArgs, TParent, TContext, TReturn>,
  publicResolver: boolean = false,
): TypedResolver<TArgs, TParent, TContext, TReturn> {
  return async (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => {
    if (!publicResolver && !context.user) {
      throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHORIZED', http: { status: 401 } } })
    }

    return resolverFn(parent, args, context, info)
  }
}
