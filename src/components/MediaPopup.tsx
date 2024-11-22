import React, { useState } from 'react'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface MediaPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (mediaItem: any) => void
  title: string
}

const UploadMediaComponent = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

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

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      console.log('File uploaded successfully:', data)
      toast.success('Media uploaded successfully')
      onUploadSuccess()
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Failed to upload media')
    } finally {
      setUploading(false)
      setFile(null)
    }
  }

  return (
    <div className="space-y-4 mb-6">
      <Input type="file" onChange={handleFileChange} accept="image/*,video/*" />
      <Button 
        onClick={handleUpload} 
        disabled={!file || uploading}
        className="w-full"
      >
        {uploading ? 'Uploading...' : 'Upload'}
        <Upload className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

export const MediaPopup: React.FC<MediaPopupProps> = ({ isOpen, onClose, onSelect, title }) => {
  const { data: mediaItems, isLoading, refetch: refetchMedia } = trpc.media.getAll.useQuery()

  const { mutate: updateMedia } = trpc.media.update.useMutation({
    onSuccess: () => {
      refetchMedia()
    },
    onError: (error) => {
      console.error('Error updating media:', error)
      toast.error('Failed to update media')
    }
  })

  const handleDelete = (id: string) => {
    updateMedia({ id, showFile: false })
    toast('Media deleted successfully.', {
      action: {
        label: 'Restore',
        onClick: () => handleRestore(id)
      },
    })
  }

  const handleRestore = (id: string) => {
    updateMedia({ id, showFile: true })
    toast.success('Media restored')
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <UploadMediaComponent onUploadSuccess={refetchMedia} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
          {mediaItems?.filter(item => item.showFile).map((item) => (
            <div key={item.id} className="relative aspect-square group">
              {item.url ? (
                <>
                  <Image
                    src={item.url}
                    alt={item.filename || 'Media item'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                    onClick={() => onSelect(item)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MediaPopup