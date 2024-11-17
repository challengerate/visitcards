'use client'

import { useState } from 'react'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Image as ImageIcon, Trash2, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

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
    <Card className="max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
      </CardContent>
    </Card>
  )
}

export default function MediaPage() {
  const { data: mediaItems, isLoading: isLoadingMedia, refetch: refetchMedia } = trpc.media.getAll.useQuery()

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

  return (
    <div className="container mx-auto py-10">
      <UploadMediaComponent onUploadSuccess={refetchMedia} />

      <Card>
        <CardHeader>
          <CardTitle>Existing Media</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingMedia ? (
            <p>Loading media...</p>
          ) : mediaItems && mediaItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.filter(item => item.showFile).map((item) => (
                <div key={item.id} className="relative aspect-square">
                  {item.url ? (
                    <>
                      <Image
                        src={item.url}
                        alt={item.filename || 'Media item'}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No media items found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}