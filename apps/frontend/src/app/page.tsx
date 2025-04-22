'use client'

import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { loginMutation } from '~/lib/apollo/mutations/login'

type FormData = {
  username: string
  password: string
}

export default function Home () {
  const router = useRouter()
  const [login] = useMutation<{ logIn: { jwt: string } }>(loginMutation, {
    onCompleted: (data) => {
      if (data.logIn.jwt) {
        localStorage.setItem('jwt', data.logIn.jwt)
        router.push('/chat')
      }
    },
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleLogin = async (data: FormData) => {
    try {
      await login({
        variables: {
          username: data.username,
          password: data.password,
        },
      })
    } catch {
      toast.error('Could not log in')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-neutral-800 shadow-md size-full max-w-[400px] h-[400px] rounded flex flex-col justify-center p-4 relative">
        <h1 className='mx-auto mb-9 text-2xl'>Nimble Chat</h1>
        <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit(handleLogin)}>
          <input type="text" placeholder="Username" autoComplete='username' {...register('username', { required: true })} className='p-2 w-full border border-foreground outline-none' />
          {errors.username && <span className='text-red-500'>This field is required</span>}
          <input type="password" placeholder="Password" autoComplete='current-password' {...register('password', { required: true })} className='p-2 w-full border border-foreground outline-none' />
          {errors.password && <span className='text-red-500'>This field is required</span>}
          <input type='submit' className='p-2 bg-background border border-foreground cursor-pointer'/>
        </form>
        <Link className='absolute bottom-4 right-4' href='/signup'>Don&apos;t have an account?</Link>
      </div>
    </div>
  )
}
