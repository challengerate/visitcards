'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

type FormData = z.infer<typeof formSchema>

export default function VisitorResponseForm({ cardId }: { cardId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const { mutate: submitResponse } = trpc.visitorResponses.create.useMutation({
    onSuccess: () => {
      toast.success('Response submitted successfully')
      reset()
    },
    onError: (error) => {
      console.error('Submission error:', error)
      toast.error('Failed to submit response')
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true)
    submitResponse({ ...data, cardId })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          placeholder="Your Name"
          className="w-full"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Your Email"
          className="w-full"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Textarea
          {...register('message')}
          placeholder="Your Message"
          className="w-full"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Response'}
      </Button>
    </form>
  )
}