import { z } from 'zod';
import { router, publicProcedure, privateProcedure } from './trpc';
import { getPayloadClient } from '../get-payload';
import { TRPCError } from '@trpc/server';

const digitalBusinessCardSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  customName: z
    .string()
    .min(3, 'Custom name must be at least 3 characters')
    .max(50, 'Custom name must be at most 50 characters'),
  tagline: z.string().optional(),
  bio: z.any().optional(),
  about: z.any().optional(),
  companyAddress: z.string().optional(),
  googleMapsLink: z.string().optional(),
  websiteURL: z.string().url().optional().or(z.literal('')),
  emails: z.array(z.object({
    title: z.string(),
    email: z.string().email(),
  })).optional(),
  mobileNumbers: z.array(z.object({
    title: z.string(),
    mobileNumber: z.string(),
  })).optional(),
  whatsAppNumber: z.string().optional(),
  socialMediaLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
  }).optional(),
  paymentInfo: z.object({
    upiLinks: z.array(z.object({ upiId: z.string() })).optional(),
    bank: z.string().optional(),
    ifsc: z.string().optional(),
    beneficiary: z.string().optional(),
    accountNumber: z.string().optional(),
    accountType: z.string().optional(),
    gstNumber: z.string().optional(),
  }).optional(),
  googleReviewsLink: z.string().optional(),
  newsletterSignup: z.string().optional(),
  brandWebsiteLink: z.string().optional(),
  profilePhoto: z.string().nullable().optional(),
  companyLogo: z.string().nullable().optional(),
  bannerImage: z.string().nullable().optional(),
  qrCode: z.string().nullable().optional(),
  products: z.array(z.object({
    name: z.string(),
    price: z.number(),
    discountPrice: z.number().optional(),
    image: z.string().nullable().optional(),
  })).optional(),
  photoGallery: z.array(z.object({
    photo: z.string().nullable().optional(),
  })).optional(),
  customSocialMediaLinks: z.array(z.object({
    title: z.string(),
    url: z.string(),
    icon: z.string().nullable().optional(),
  })).optional(),
  videos: z.array(z.object({
    videoUrl: z.string(),
  })).optional(),
  ctaButtons: z.array(z.object({
    label: z.string(),
    url: z.string(),
    icon: z.string().nullable().optional(),
  })).optional(),
});

export const digitalBusinessCardRouter = router({
  getByCustomName: publicProcedure
    .input(z.object({ customName: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      const { docs } = await payload.find({
        collection: 'digital-business-cards',
        where: {
          customName: {
            equals: input.customName,
          },
        },
      });
      return docs[0] || null;
    }),

  create: privateProcedure
    .input(digitalBusinessCardSchema)
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      try {
        const newCard = await payload.create({
          collection: 'digital-business-cards',
          data: {
            ...input,
            userId: ctx.user.id,
            profilePhoto: input.profilePhoto ? input.profilePhoto : null,
            companyLogo: input.companyLogo ? input.companyLogo : null,
            bannerImage: input.bannerImage ? input.bannerImage : null,
            qrCode: input.qrCode ? input.qrCode : null,
          },
        });
        return newCard;
      } catch (error) {
        console.error('Error creating digital business card:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create digital business card',
        });
      }
    }),

  update: privateProcedure
    .input(digitalBusinessCardSchema.extend({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      const { id, ...data } = input;
      try {
        const updatedCard = await payload.update({
          collection: 'digital-business-cards',
          id: id,
          data: {
            ...data,
            userId: ctx.user.id,
            profilePhoto: data.profilePhoto ? data.profilePhoto : null,
            companyLogo: data.companyLogo ? data.companyLogo : null,
            bannerImage: data.bannerImage ? data.bannerImage : null,
            qrCode: data.qrCode ? data.qrCode : null,
          },
        });
        return updatedCard;
      } catch (error) {
        console.error('Error updating digital business card:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update digital business card',
        });
      }
    }),

  getUserCards: privateProcedure.query(async ({ ctx }) => {
    const payload = await getPayloadClient();
    try {
      const { docs } = await payload.find({
        collection: 'digital-business-cards',
        where: {
          userId: {
            equals: ctx.user.id,
          },
        },
      });
      return docs;
    } catch (error) {
      console.error('Error fetching user cards:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user cards',
      });
    }
  }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      try {
        await payload.delete({
          collection: 'digital-business-cards',
          id: input.id,
        });
        return { success: true };
      } catch (error) {
        console.error('Error deleting digital business card:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete digital business card',
        });
      }
    }),
});