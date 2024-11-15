import { z } from 'zod'
import { privateProcedure, publicProcedure, router } from './trpc'

export const visitorResponsesRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
        cardId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, message, cardId } = input
      const { payload } = ctx

      try {
        const response = await payload.create({
          collection: 'visitor-responses',
          data: {
            name,
            email,
            message,
            card: cardId,
          },
        })
        return response
      } catch (error) {
        console.error('Error creating visitor response:', error)
        throw new Error('Failed to create visitor response')
      }
    }),

  getByCardId: privateProcedure
    .input(z.object({ cardId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { cardId } = input
      const { payload } = ctx

      try {
        const responses = await payload.find({
          collection: 'visitor-responses',
          where: {
            card: {
              equals: cardId,
            },
          },
          sort: '-createdAt',
        })
        return responses.docs
      } catch (error) {
        console.error('Error fetching visitor responses:', error)
        throw new Error('Failed to fetch visitor responses')
      }
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const { payload } = ctx

      try {
        await payload.delete({
          collection: 'visitor-responses',
          id,
        })
        return { success: true }
      } catch (error) {
        console.error('Error deleting visitor response:', error)
        throw new Error('Failed to delete visitor response')
      }
    }),
})