import { z } from "zod"

export const cardSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  customName: z
    .string()
    .min(3, "Custom name must be at least 3 characters")
    .max(50, "Custom name must be at most 50 characters"),
  tagline: z.string().optional(),
  bio: z.any().optional(),
  about: z.any().optional(),
  companyAddress: z.string().optional(),
  googleMapsLink: z.string().optional(),
  websiteURL: z.string().url().optional().or(z.literal("")),
  emails: z
    .array(z.object({ title: z.string(), email: z.string().email() }))
    .optional(),
  mobileNumbers: z
    .array(z.object({ title: z.string(), mobileNumber: z.string() }))
    .optional(),
  whatsAppNumber: z.string().optional(),
  socialMediaLinks: z
    .object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
    })
    .optional(),
  paymentInfo: z
    .object({
      upiLinks: z.array(z.object({ upiId: z.string() })).optional(),
      bank: z.string().optional(),
      ifsc: z.string().optional(),
      beneficiary: z.string().optional(),
      accountNumber: z.string().optional(),
      accountType: z.string().optional(),
      gstNumber: z.string().optional(),
    })
    .optional(),
  googleReviewsLink: z.string().optional(),
  newsletterSignup: z.string().optional(),
  brandWebsiteLink: z.string().optional(),
  profilePhoto: z.string().optional(),
  companyLogo: z.string().optional(),
  bannerImage: z.string().optional(),
  qrCode: z.string().optional(),
  products: z
    .array(
      z.object({
        name: z.string(),
        price: z.number(),
        discountPrice: z.number().optional(),
        image: z.string().optional(),
      })
    )
    .optional(),
  photoGallery: z
    .array(
      z.object({
        photo: z.string().optional(),
      })
    )
    .optional(),
  customSocialMediaLinks: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        icon: z.string().optional(),
      })
    )
    .optional(),
  videos: z
    .array(
      z.object({
        videoUrl: z.string(),
      })
    )
    .optional(),
  ctaButtons: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
        icon: z.string().optional(),
      })
    )
    .optional(),
})