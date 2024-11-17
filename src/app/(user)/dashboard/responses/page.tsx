'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, Trash2 } from 'lucide-react'
import { trpc } from '@/trpc/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function ResponsesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cardId, setCardId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { data: responses, refetch } = trpc.visitorResponses.getByCardId.useQuery(
    { cardId: cardId || '' },
    {
      enabled: !!cardId,
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

  useEffect(() => {
    const id = searchParams.get('cardId')
    if (id) {
      setCardId(id)
    } else {
      router.push('/dashboard')
    }
  }, [searchParams, router])

  const handleDelete = (responseId: string) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      deleteResponse({ id: responseId })
    }
  }

  if (!cardId) {
    return (
      <div className="container mx-auto py-10">
        <Button
          onClick={() => router.push('/dashboard')}
          className="mb-6"
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <p>No card selected. Please choose a card from the dashboard.</p>
      </div>
    )
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

      <h1 className="text-3xl font-bold mb-6">Responses for Your Digital Business Card</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : responses && responses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {responses.map((response) => (
            <Card key={response.id} className="flex flex-col">
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
                <p className="mb-4">{response.message}</p>
                <p className="text-xs text-muted-foreground">
                  Submitted on: {format(new Date(response.createdAt), 'PPP')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No responses yet.</p>
      )}
    </div>
  )
}