'use client'

import { Button } from './ui/button'
import Link from 'next/link'

const NavItems = () => {
  return (
    <div className='flex items-center gap-4 h-full'>
      <Button asChild variant='ghost' size='sm'>
        <Link href='/dashboard'>Dashboard</Link>
      </Button>
      <Button asChild variant='ghost' size='sm'>
        <Link href='/team'>Team</Link>
      </Button>
      <Button asChild variant='ghost' size='sm'>
        <Link href='/projects'>Projects</Link>
      </Button>
    </div>
  )
}

export default NavItems