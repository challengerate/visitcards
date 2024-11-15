'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { Icons } from '@/components/Icons'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'


const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

type SignInData = z.infer<typeof SignInValidator>

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
    resolver: zodResolver(SignInValidator),
  })

  const { mutate: signIn } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Signed in successfully')
      router.push('/dashboard')
      router.refresh()
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password.')
      } else {
        toast.error('An error occurred. Please try again.')
      }
      setIsLoading(false)
    },
  })

  const onSubmit = (data: SignInData) => {
    setIsLoading(true)
    signIn(data)
  }

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <Icons.logo className='h-20 w-20' />
          <h1 className='text-2xl font-semibold tracking-tight'>
            Sign in to your account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='you@example.com'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
        <Loader2 className='h-8 w-8 animate-spin' />
      ) : null}
            Sign In
          </Button>
        </form>

        <p className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' className='font-medium text-primary hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}