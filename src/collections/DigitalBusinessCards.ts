import { CollectionConfig } from 'payload/types';

export const DigitalBusinessCards: CollectionConfig = {
  slug: 'digital-business-cards',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'customName',
      type: 'text',
      required: true,
      unique: true,
    },

    // Personal Information
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'jobTitle',
      type: 'text',
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'text',
      admin: {
        description: 'Enter the bio in HTML format',
      },
    },
    {
      name: 'about',
      type: 'text',
      admin: {
        description: 'Enter the about in HTML format',
      },
    },

    // Company Information
    {
      name: 'companyAddress',
      type: 'textarea',
    },
    {
      name: 'googleMapsLink',
      type: 'text',
    },
    {
      name: 'websiteURL',
      type: 'text',
    },

    // Contact Information
    {
      name: 'emails',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    {
      name: 'mobileNumbers',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'mobileNumber',
          type: 'text',
        },
      ],
    },
    {
      name: 'whatsAppNumber',
      type: 'text',
    },
    {
      name: 'customContactOptions',
      type: 'array',
      fields: [
        {
          name: 'linkName',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },

    // Social Media Links
    {
      name: 'socialMediaLinks',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
      ],
    },

    // Payment Information 
    {
      name: 'paymentInfo',
      type: 'group',
      fields: [
        {
          name: 'upiLinks',
          type: 'array',
          fields: [{ name: 'upiId', type: 'text' }],
        },
        {
          name: 'bank',
          type: 'text',
        },
        {
          name: 'ifsc',
          type: 'text',
        },
        {
          name: 'beneficiary',
          type: 'text',
        },
        {
          name: 'accountNumber',
          type: 'text',
        },
        {
          name: 'accountType',
          type: 'text',
        },
        {
          name: 'gstNumber',
          type: 'text',
        },
      ],
    },
    {
      name: 'qrCode',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    // Product / Services
    {
      name: 'products',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'price', type: 'number' },
        { name: 'discountPrice', type: 'number' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },

    // New fields
    {
      name: 'photoGallery',
      type: 'array',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'customSocialMediaLinks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'url', type: 'text' },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'videos',
      type: 'array',
      fields: [{ name: 'videoUrl', type: 'text' }],
    },
    {
      name: 'ctaButtons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
  ],
};