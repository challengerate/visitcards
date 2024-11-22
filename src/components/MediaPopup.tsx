import React from 'react'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'

interface MediaPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (mediaItem: any) => void
  title: string
}

export const MediaPopup: React.FC<MediaPopupProps> = ({ isOpen, onClose, onSelect, title }) => {
  const { data: mediaItems, isLoading } = trpc.media.getAll.useQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {mediaItems?.map((item) => (
            <div key={item.id} className="relative aspect-square">
              <Image
                src={item.url as string}
                alt={item.filename as string}
                layout="fill"
                objectFit="cover"
                className="rounded-lg cursor-pointer"
                onClick={() => onSelect(item)}
              />
            </div>
          ))}
        </div>
        <Button onClick={() => window.open('/media', '_blank')}>Upload New Media</Button>
      </DialogContent>
    </Dialog>
  )
}