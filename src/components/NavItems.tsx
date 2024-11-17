'use client'

import { Button } from './ui/button'
import Link from 'next/link'

const NavItems = () => {
  return (
    <nav>
      <ul className='flex items-center justify-center gap-8'>
        <li>
          <Button asChild variant='ghost' size='sm'>
            <Link href='/contactus'>Contact Us</Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default NavItems