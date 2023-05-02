import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import YearToggle from '@/components/YearToggle'
import AssetNameSelector from '@/components/AssetNameSelector'

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 pb-5">
      <div className="flex-1">
        <Link href="/" className="p-5">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={120}
            height={50}
            priority
          />
        </Link>
      </div>
      <div className="flex-none">
        <AssetNameSelector />
      </div>
      <div className={'flex-none'}>
        <YearToggle />
      </div>
    </div>
  )
}
