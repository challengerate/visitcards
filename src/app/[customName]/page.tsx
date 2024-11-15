import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/get-payload'
import Link from 'next/link'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify'
import { DigitalBusinessCard } from '@/payload-types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Send, Globe, Share2 } from 'lucide-react'
import InteractiveCardContent from './InteractiveCardContent'
import VisitorResponseForm from './VisitorResponseForm'

interface PageProps {
  params: {
    customName: string
  }
}

// Type guard to check if googleReviewsLink exists on the card object
function hasGoogleReviewsLink(card: DigitalBusinessCard): card is DigitalBusinessCard & { googleReviewsLink: string } {
  return (card as any).googleReviewsLink !== undefined
}

const DigitalBusinessCardPage = async ({ params }: PageProps) => {
  const { customName } = params
  const payload = await getPayloadClient()

  if (!payload) {
    return notFound()
  }

  const { docs } = await payload.find({
    collection: 'digital-business-cards',
    where: {
      customName: {
        equals: customName,
      },
    },
  })

  const card = docs[0] as DigitalBusinessCard

  if (!card) {
    return notFound()
  }

  const getImageUrl = (image: any) => {
    if (!image || !image.url) return ''
    return image.url.startsWith('http') ? image.url : `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}`
  }

  const profilePhotoUrl = getImageUrl(card.profilePhoto)
  const companyLogoUrl = getImageUrl(card.companyLogo)
  const bannerImageUrl = getImageUrl(card.bannerImage)
  const qrCodeUrl = getImageUrl(card.qrCode)

  const sanitizedBio = card.bio ? DOMPurify.sanitize(card.bio as string) : ''
  const sanitizedAbout = card.about ? DOMPurify.sanitize(card.about as string) : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 font-sans">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Card className="overflow-hidden rounded-3xl shadow-xl">
          <div className="relative h-64 md:h-80">
            {bannerImageUrl && (
              <Image
                src={bannerImageUrl}
                alt={card.fullName}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end p-8">
              {profilePhotoUrl && (
                <Image
                  src={profilePhotoUrl}
                  alt={card.fullName}
                  width={140}
                  height={140}
                  className="rounded-full border-4 border-white shadow-lg mr-6"
                />
              )}
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">{card.fullName}</h1>
                {card.jobTitle && <p className="text-2xl opacity-90">{card.jobTitle}</p>}
              </div>
            </div>
          </div>
          <CardContent className="p-8 bg-white">
            {card.tagline && <p className="text-2xl italic text-gray-700 mb-6">{card.tagline}</p>}
            {card.companyName && (
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                {companyLogoUrl && (
                  <Image
                    src={companyLogoUrl}
                    alt={card.companyName}
                    width={56}
                    height={56}
                    className="rounded-lg"
                  />
                )}
                <div>
                  <p className="text-xl font-semibold text-gray-800">{card.companyName}</p>
                  {card.companyAddress && (
                    <p className="text-sm text-gray-600 mt-1">{card.companyAddress}</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bio Section */}
        {sanitizedBio && (
          <Card className="rounded-3xl shadow-xl">
            <CardContent className="p-8 bg-white">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">About Me</h2>
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: sanitizedBio }}
              />
            </CardContent>
          </Card>
        )}

        {/* Interactive Content */}
        <InteractiveCardContent card={card} />

        {/* About Section */}
        {sanitizedAbout && (
          <Card className="rounded-3xl shadow-xl">
            <CardContent className="p-8 bg-white">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">More About Me</h2>
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: sanitizedAbout }}
              />
            </CardContent>
          </Card>
        )}

        {/* Additional Links */}
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Additional Information</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {hasGoogleReviewsLink(card) && (
                <a href={card.googleReviewsLink} target="_blank" rel="noopener noreferrer" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-6 py-3 rounded-full flex items-center transition duration-300">
                  <Star className="mr-2 w-5 h-5" />
                  View Google Reviews
                </a>
              )}
              {card.websiteURL && (
                <a href={card.websiteURL} target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-800 hover:bg-green-200 px-6 py-3 rounded-full flex items-center transition duration-300">
                  <Globe className="mr-2 w-5 h-5" />
                  Visit Website
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Visitor Response Form */}
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Leave a Response</h2>
            <VisitorResponseForm cardId={card.id} />
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="rounded-3xl shadow-xl">
          <CardFooter className="justify-center p-6 bg-white">
            <Link href="/dashboard">
              <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 px-8 py-3 rounded-full transition duration-300">
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Share Button */}
      <button className="fixed bottom-6 right-6 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
        <Share2 className="w-6 h-6" />
      </button>
    </div>
  )
}

export default DigitalBusinessCardPage
