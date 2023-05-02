import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from '@/components/Providers/Providers'
import getAssets from '@/api/assets'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Risk App',
  description: 'risk data info',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const assetsData = await getAssets()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers assetsData={assetsData}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
