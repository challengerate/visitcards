import { z } from 'zod'
import { router, publicProcedure, privateProcedure } from './trpc'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'

const mediaSchema = z.object({
  showFile: z.boolean(),
})

export const mediaRouter = router({
  upload: privateProcedure
    .input(z.object({
      file: z.any(),
      showFile: z.boolean(),
    }))
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()
      try {
        const media = await payload.create({
          collection: 'media',
          data: {
            showFile: input.showFile,
          },
          file: input.file,
          user: ctx.user,
        })
        return media
      } catch (error) {
        console.error('Error uploading media:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to upload media',
        })
      }
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const payload = await getPayloadClient()
    try {
      const { docs } = await payload.find({
        collection: 'media',
        where: {
          user: {
            equals: ctx.user.id,
          },
        },
      })
      return docs
    } catch (error) {
      console.error('Error fetching media:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch media',
      })
    }
  }),

  update: privateProcedure
    .input(mediaSchema.extend({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()
      const { id, ...data } = input
      try {
        const updatedMedia = await payload.update({
          collection: 'media',
          id: id,
          data: {
            ...data,
          },
          user: ctx.user,
        })
        return updatedMedia
      } catch (error) {
        console.error('Error updating media:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update media',
        })
      }
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()
      try {
        await payload.delete({
          collection: 'media',
          id: input.id,
          user: ctx.user,
        })
        return { success: true }
      } catch (error) {
        console.error('Error deleting media:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete media',
        })
      }
    }),
})