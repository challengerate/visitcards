// src/components/DigitalBusinessCard.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  tagline: z.string().optional(),
  companyAddress: z.string().optional(),
  websiteURL: z.string().url().optional().or(z.literal('')),
  mobileNumber: z.string().optional(),
  workPhoneNumber: z.string().optional(),
  bio: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface DigitalBusinessCardProps {
  userId: string
}

const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false)
  //@ts-ignore
  const { data: card, refetch } = trpc.digitalBusinessCards.getByUserId.useQuery({ userId })
  const updateCard = trpc.digitalBusinessCards.update.useMutation()
  const createCard = trpc.digitalBusinessCards.create.useMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: card ? {
      ...card,
      mobileNumber: card.mobileNumber?.toString() || '',
      workPhoneNumber: card.workPhoneNumber?.toString() || '',
    } : {},
  })

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      mobileNumber: data.mobileNumber ? Number(data.mobileNumber) : null,
      workPhoneNumber: data.workPhoneNumber ? Number(data.workPhoneNumber) : null,
    }

    if (card) {
      //@ts-ignore
      await updateCard.mutateAsync({ id: card.id, ...formattedData })
    } else {
            //@ts-ignore
      await createCard.mutateAsync({ userId, ...formattedData })
    }
    setIsEditing(false)
    refetch()
  }

  if (!card && !isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Digital Business Card Found</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsEditing(true)}>Create New Card</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Digital Business Card' : 'Digital Business Card'}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register('fullName')} placeholder="Full Name" />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            <Input {...register('jobTitle')} placeholder="Job Title" />
            <Input {...register('companyName')} placeholder="Company Name" />
            <Input {...register('tagline')} placeholder="Tagline" />
            <Textarea {...register('companyAddress')} placeholder="Company Address" />
            <Input {...register('websiteURL')} placeholder="Website URL" />
            {errors.websiteURL && <p className="text-red-500">{errors.websiteURL.message}</p>}
            <Input {...register('mobileNumber')} placeholder="Mobile Number" type="tel" />
            <Input {...register('workPhoneNumber')} placeholder="Work Phone Number" type="tel" />
            <Textarea {...register('bio')} placeholder="Bio" />
            <div className="flex justify-end space-x-2">
              <Button type="submit">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{card?.fullName}</h2>
            <p className="text-lg text-gray-600">{card?.jobTitle}</p>
            <p>{card?.companyName}</p>
            <p>{card?.tagline}</p>
            <p>{card?.companyAddress}</p>
            <p>Website: <a href={card?.websiteURL} className="text-blue-600 hover:underline">{card?.websiteURL}</a></p>
            <p>Mobile: {card?.mobileNumber}</p>
            <p>Work: {card?.workPhoneNumber}</p>
            <p className="italic">{card?.bio}</p>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DigitalBusinessCard