import Footer from '@/components/Footer'
import React from 'react'

interface Props {
    children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
              <main className="flex-grow flex-1">
                {children}
              </main>
              <Footer />
            </div>
    )
};

export default MarketingLayout
