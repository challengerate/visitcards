'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in']

  if (pathsToMinimize.includes(pathname)) {
    return (
      <footer className="bg-background border-t border-border">
        <MaxWidthWrapper>
          <div className="py-10 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    )
  }

  return (
    <footer className="bg-background border-t border-border">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center py-16 px-6 lg:px-8 lg:py-32">
          <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary/10 w-72 h-72 rounded-full -z-10 blur-[14rem]" />
          <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary/10 w-72 h-72 rounded-full -z-10 blur-[14rem]" />
          
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            
            <p className="text-muted-foreground text-sm text-center">
              Made in India. Built for Progress.
            </p>

            <nav className="flex flex-wrap justify-center gap-8">
              {[
                { label: 'Log In', href: '/sign-in' },
                { label: 'About us', href: '/about' },
                { label: 'Changelog', href: '/Changelog' },
                { label: 'Join the team', href: '/jointheteam' },
                { label: 'Explore', href: '/explore' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-16 border-t border-border w-full pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Visit Cards. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer