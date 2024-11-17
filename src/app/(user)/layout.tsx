import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn(
        'relative h-full font-sans antialiased bg-background text-foreground max-w-full overflow-x-hidden',
        inter.className
    )}>
      <Providers>
      <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow flex-1">
                {children}
              </main>
              <Footer />
            </div>
      </Providers>
      <Toaster position='top-center' richColors />
    </div>
  )
}