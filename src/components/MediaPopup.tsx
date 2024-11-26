import React, { useState } from 'react'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Upload } from 'lucide-react'

interface MediaPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (mediaItem: any) => void
  title: string
}

export const MediaPopup: React.FC<MediaPopupProps> = ({ isOpen, onClose, onSelect, title }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { data: mediaItems, isLoading, refetch } = trpc.media.getAll.useQuery()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')
      
      setFile(null)
      refetch() // Refresh the media list
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*,video/*"
              className="flex-1"
            />
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </div>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}