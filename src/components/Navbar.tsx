import Link from 'next/link'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'

const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <header className="sticky top-0 inset-x-0 h-16 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-full">
          {/* Mobile navigation and logo */}
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="flex lg:ml-0">
              <Link href="/">
                <div className="h-16 w-16 rounded-lg overflow-hidden">
                  <Image
                    src="/logo1.png"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Center navigation for larger screens */}
          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <NavItems />
          </nav>

          {/* User actions */}
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
      </MaxWidthWrapper>
    </header>
  )
}

export default Navbar
