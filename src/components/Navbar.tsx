import Link from 'next/link'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'
import { Icons } from './Icons'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { Container } from '@/components'
import { buttonVariants } from '@/components/ui/button'

const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <header className="sticky top-0 inset-x-0 h-16 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className='flex lg:ml-0'>
              <Link href='/'>
                <Icons.logo className='h-16 w-16' />
                
              </Link>
            </div>
          </div>

          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <NavItems />
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Dashboard
                </Link>
                <UserAccountNav user={user} />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({ size: 'sm', className: 'hidden sm:inline-flex' })}
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Navbar