'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Phone, Mail, Globe, MapPin, Linkedin, Twitter, Instagram, Facebook, ChevronDown, ChevronUp, X } from 'lucide-react'

const MAX_ITEMS_DISPLAY = 4

//@ts-ignore
const InteractiveCardContent = ({ card }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const getImageUrl = (image: any) => {
    if (!image || !image.url) return ''
    return image.url.startsWith('http') ? image.url : `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}`
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const renderArraySection = (title: string, items: any[], renderItem: (item: any, index: number) => React.ReactNode) => {
    const isExpanded = expandedSections[title]
    const displayItems = isExpanded ? items : items.slice(0, MAX_ITEMS_DISPLAY)

    return (
      <Card className="rounded-3xl shadow-xl">
        <CardContent className="p-8 bg-white">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayItems.map(renderItem)}
          </div>
          {items.length > MAX_ITEMS_DISPLAY && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => toggleSection(title)}
                  className="mt-4 w-full"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" /> View More
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ScrollArea className="h-[80vh] pr-4">
                  <div className="grid grid-cols-1 gap-6">
                    {items.map(renderItem)}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Contact Information */}
      {renderArraySection(
        "Contact Information",
        [
          ...(card.websiteURL ? [{ type: 'website', value: card.websiteURL }] : []),
          ...(card.googleMapsLink ? [{ type: 'location', value: card.googleMapsLink }] : []),
          ...(card.whatsAppNumber ? [{ type: 'whatsapp', value: card.whatsAppNumber }] : []),
          ...(card.emails || []),
          ...(card.mobileNumbers || []),
          ...(card.customContactOptions || []),
        ],
        (item, index) => {
          switch (item.type) {
            case 'website':
              return (
                <div key={index} className="flex items-center bg-blue-50 p-4 rounded-xl">
                  <Globe className="mr-3 text-blue-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-800">Website</p>
                    <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {item.value}
                    </a>
                  </div>
                </div>
              )
            case 'location':
              return (
                <div key={index} className="flex items-center bg-red-50 p-4 rounded-xl">
                  <MapPin className="mr-3 text-red-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                      Google Maps
                    </a>
                  </div>
                </div>
              )
            case 'whatsapp':
              return (
                <div key={index} className="flex items-center bg-green-50 p-4 rounded-xl">
                  <Phone className="mr-3 text-green-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <span className="text-green-600">{item.value}</span>
                  </div>
                </div>
              )
            default:
              if ('email' in item) {
                return (
                  <div key={index} className="flex items-center bg-purple-50 p-4 rounded-xl">
                    <Mail className="mr-3 text-purple-600 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <a href={`mailto:${item.email}`} className="text-purple-600 hover:underline">{item.email}</a>
                    </div>
                  </div>
                )
              } else if ('mobileNumber' in item) {
                return (
                  <div key={index} className="flex items-center bg-yellow-50 p-4 rounded-xl">
                    <Phone className="mr-3 text-yellow-600 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <a href={`tel:${item.mobileNumber}`} className="text-yellow-600 hover:underline">{item.mobileNumber}</a>
                    </div>
                  </div>
                )
              } else if  ('linkName' in item) {
                return (
                  <div key={index} className="flex items-center bg-gray-50 p-4 rounded-xl">
                    {item.icon && (
                      <Image
                        src={getImageUrl(item.icon)}
                        alt={item.linkName}
                        width={24}
                        height={24}
                        className="mr-3"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">{item.linkName}</p>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
                        View Profile
                      </a>
                    </div>
                  </div>
                )
              }
              return null
          }
        }
      )}

      {/* Social Media Links */}
      {(card.socialMediaLinks || card.customSocialMediaLinks) && (
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Connect With Me</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {card.socialMediaLinks?.linkedin && (
                <a href={card.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                  <Linkedin className="w-12 h-12 text-blue-700" />
                </a>
              )}
              {card.socialMediaLinks?.twitter && (
                <a href={card.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                  <Twitter className="w-12 h-12 text-blue-400" />
                </a>
              )}
              {card.socialMediaLinks?.instagram && (
                <a href={card.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                  <Instagram className="w-12 h-12 text-pink-600" />
                </a>
              )}
              {card.socialMediaLinks?.facebook && (
                <a href={card.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                  <Facebook className="w-12 h-12 text-blue-600" />
                </a>
              )}
              {//@ts-ignore

              card.customSocialMediaLinks && card.customSocialMediaLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                  {link.icon ? (
                    <Image
                      src={getImageUrl(link.icon)}
                      alt={link.title}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                      {link.title[0].toUpperCase()}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Section */}
      {card.products && card.products.length > 0 && renderArraySection(
        "Products and Services",
        card.products,
        (product, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl">
            {product.image && (
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg mb-4"
              />
            )}
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">
              Price: ${product.price.toFixed(2)}
              {product.discountPrice && (
                <span className="ml-2 text-red-500 line-through">
                  ${product.discountPrice.toFixed(2)}
                </span>
              )}
            </p>
          </div>
        )
      )}
      
      {/* Payment Information */}
      {card.paymentInfo && (
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Payment Information</h2>
            <div className="space-y-6">
              {card.paymentInfo.upiLinks && card.paymentInfo.upiLinks.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-semibold text-gray-700 mb-2">UPI</p>
                  <p>{card.paymentInfo.upiLinks[0].upiId}</p>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="font-semibold text-gray-700 mb-2">Bank Details</p>
                <div className="grid grid-cols-2 gap-4">
                  {card.paymentInfo.bank && <p><span className="font-medium">Bank:</span> {card.paymentInfo.bank}</p>}
                  {card.paymentInfo.ifsc && <p><span className="font-medium">IFSC:</span> {card.paymentInfo.ifsc}</p>}
                  {card.paymentInfo.beneficiary && <p><span className="font-medium">Beneficiary:</span> {card.paymentInfo.beneficiary}</p>}
                  {card.paymentInfo.accountNumber && <p><span className="font-medium">Account Number:</span> {card.paymentInfo.accountNumber}</p>}
                  {card.paymentInfo.accountType && <p><span className="font-medium">Account Type:</span> {card.paymentInfo.accountType}</p>}
                </div>
              </div>
              {card.paymentInfo.gstNumber && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-semibold text-gray-700 mb-2">GST Number</p>
                  <p>{card.paymentInfo.gstNumber}</p>
                </div>
              )}
            </div>
            {card.qrCode && (
              <div className="mt-6 flex justify-center">
                <Image
                  src={getImageUrl(card.qrCode)}
                  alt={`${card.fullName} QR Code`}
                  width={200}
                  height={200}
                  className="rounded-xl shadow-md"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Photo Gallery */}
      {card.photoGallery && card.photoGallery.length > 0 && (
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {
                //@ts-ignore
              card.photoGallery.map((item, index) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-xl">
                  <Image
                    src={getImageUrl(item.photo)}
                    alt={`Gallery image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(getImageUrl(item.photo))}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Popup */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-square">
              <Image
                src={selectedImage}
                alt="Selected image"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <Button
              className="absolute top-2 right-2"
              variant="ghost"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Videos */}
      {card.videos && card.videos.length > 0 && renderArraySection(
        "Videos",
        card.videos,
        (video, index) => (
          <div key={index} className="aspect-video">
            <iframe
              src={video.videoUrl}
              title={`Video ${index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            ></iframe>
          </div>
        )
      )}

      {/* CTA Buttons */}
      {card.ctaButtons && card.ctaButtons.length > 0 && (
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Quick Actions</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {
              //@ts-ignore
              card.ctaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
                >
                  {button.icon && (
                    <Image
                      src={getImageUrl(button.icon)}
                      alt=""
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                  )}
                  {button.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default InteractiveCardContent