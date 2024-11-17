'use client'

import { Button } from './ui/button'
import Link from 'next/link'

const NavItems = () => {
  return (
    <nav>
      <ul className='flex items-center justify-center gap-8'>
        <li>
          <Button asChild variant='ghost' size='sm'>
            <Link href='/dashboard'>Dashboard</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='ghost' size='sm'>
            <Link href='/team'>Team</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='ghost' size='sm'>
            <Link href='/projects'>Projects</Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default NavItems