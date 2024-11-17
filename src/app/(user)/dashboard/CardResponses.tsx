'use client'

import { useState } from 'react'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronLeft, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export default function CardResponses({ cardId }: { cardId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const { data: responses, refetch } = trpc.visitorResponses.getByCardId.useQuery(
    { cardId },
    {
      onSettled: () => setIsLoading(false),
      onError: () => toast.error('Failed to load responses'),
    }
  )

  const { mutate: deleteResponse } = trpc.visitorResponses.delete.useMutation({
    onSuccess: () => {
      toast.success('Response deleted successfully')
      refetch()
    },
    onError: () => toast.error('Failed to delete response'),
  })

  const handleDelete = (responseId: string) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      deleteResponse({ id: responseId })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Button
        onClick={() => router.push('/dashboard')}
        className="mb-6"
        variant="outline"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Responses for Your Digital Business Card</h1>
        {responses && responses.length > 0 && (
          <Badge variant="secondary" className="text-sm">
            {responses.length} {responses.length === 1 ? 'Response' : 'Responses'}
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : responses && responses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {responses.map((response) => (
            <Card 
              key={response.id} 
              className="flex flex-col relative"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{response.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(response.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{response.email}</p>
                <p className="mb-4 whitespace-pre-wrap">{response.message}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(response.createdAt), 'PPP')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(response.createdAt), 'p')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No responses yet.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Responses will appear here when someone fills out your contact form.
          </p>
        </div>
      )}
    </div>
  )
}