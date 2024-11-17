'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'

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
        <div className="relative pt-16 pb-8 px-6 lg:px-8 lg:pt-32">
          <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary/10 w-72 h-72 rounded-full -z-10 blur-[14rem]" />
          <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary/10 w-72 h-72 rounded-full -z-10 blur-[14rem]" />

          <div className="grid gap-8 xl:grid-cols-3 xl:gap-8">
            <div className="flex flex-col items-start justify-start md:max-w-[200px]">
              <div className="flex items-start">
                <Icons.logo className="h-12 w-auto" />
              </div>
              <p className="text-muted-foreground mt-4 text-sm text-start">
                Build beautiful, functional websites, without writing code
              </p>
              <span className="mt-4 text-muted-foreground text-sm flex items-center">
                Made in India with
                <Heart className="w-3.5 h-3.5 ml-1 fill-primary text-primary" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-medium text-foreground">Product</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {['Features', 'Pricing', 'Testimonials', 'Integration'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:text-foreground transition-colors duration-300">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-medium text-foreground">Integrations</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:text-foreground transition-colors duration-300">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-medium text-foreground">Resources</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {['Blog', 'Case Studies', 'Support'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:text-foreground transition-colors duration-300">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-medium text-foreground">Company</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {['About Us', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:text-foreground transition-colors duration-300">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
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