'use client'

import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createMessageMutation } from '~/lib/apollo/mutations/create-message'
import { messagesQuery } from '~/lib/apollo/queries/messages'
import { messageCreatedSubscription } from '~/lib/apollo/subscriptions/messageCreated'

type FormData = {
  message: string
}

type Message = {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    username: string
  }
}

export default function Chat () {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [sendMessage] = useMutation<{ createMessage: { message: string } }>(createMessageMutation)
  const { data, loading, error } = useQuery<{ messages: Message[] }>(messagesQuery)
  const { data: subscriptionData, error: subscriptionError } = useSubscription<{ messageCreated: Message }>(messageCreatedSubscription, {})
  const [messages, setMessages] = useState<Message[]>()

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (subscriptionData) {
      setMessages((prevMessages) => [...(prevMessages ?? []), subscriptionData.messageCreated])
    }
  }, [subscriptionData])

  useEffect(() => {
    setMessages(data?.messages)
  }, [data])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = async (data: FormData) => {
    try {
      await sendMessage({
        variables: {
          content: data.message,
        },
      })

      reset()

    } catch {
      toast.error('Could not send message')
    }

  }

  if (error || subscriptionError) return <div>Error: {error?.message ?? subscriptionError?.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-neutral-800 shadow-md size-full max-w-[1000px] h-[500px] mt-4 rounded flex flex-col justify-center p-4 relative">
        <h1 className='mx-auto mb-9 text-2xl'>Messages</h1>
        <div className="overflow-y-scroll h-full">
          {messages?.map((message) => (
            <div key={message.id} className="p-2 border-b border-neutral-700">
              <span>{message.content}</span>
              <span className="text-sm text-neutral-500"> - {message.author.username}</span>
              <span className="text-xs text-neutral-500"> - {new Date(message.createdAt).toLocaleString()}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className='h-[250px] w-full p-2 absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center'>
        {errors.message && <span className='text-red-500'>This field is required</span>}
        <form className='flex h-full' onSubmit={handleSubmit(handleSendMessage)}>
          <textarea
            className='w-[1000px] h-full bg-neutral-800 border border-foreground rounded'
            placeholder="Type your message here..." 
            {...register('message', { required: true })} 
          />
          <input type="submit" className="p-2 bg-background border border-foreground cursor-pointer" />
        </form>
      </div>
    </div>
  )
}