import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'relative h-full font-sans antialiased bg-background text-foreground max-w-full overflow-x-hidden',
          inter.className
        )}
      >
          <Providers>
              <main className="flex-grow flex-1">
                {children}
              </main>
          </Providers>
        <Toaster position='top-center' richColors />
      </body>
    </html>
  )
}