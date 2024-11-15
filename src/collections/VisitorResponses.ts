import { CollectionConfig } from 'payload/types'

export const VisitorResponses: CollectionConfig = {
  slug: 'visitor-responses',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        'card.userId': {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        'card.userId': {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        'card.userId': {
          equals: user?.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'card',
      type: 'relationship',
      relationTo: 'digital-business-cards',
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}