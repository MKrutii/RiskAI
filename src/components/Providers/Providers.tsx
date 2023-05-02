'use client'

import React from 'react'

import GoogleMapsProvider from '@/components/Providers/GoogleMapProvider'
import Asset from '@/types/asset'
import AssetDataProvider from '@/components/Providers/AssetDataProvider'

interface ProvidersType {
  children: React.ReactNode
  assetsData: Array<Asset>
}

export function Providers({ children, assetsData }: ProvidersType) {
  return (
    <GoogleMapsProvider>
      <AssetDataProvider assetsData={assetsData}>
        {children}
      </AssetDataProvider>
    </GoogleMapsProvider>
  )
}

export default {}
