'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4 py-4">
          <Link
            href='/sign-in'
            className='text-sm font-medium text-gray-700 hover:text-gray-800'
            onClick={() => setIsOpen(false)}
          >
            Sign in
          </Link>
          <Link
            href='/sign-up'
            className='text-sm font-medium text-gray-700 hover:text-gray-800'
            onClick={() => setIsOpen(false)}
          >
            Create account
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav