import React, { ReactNode, useContext, useMemo } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'

const GoogleMapsContext = React.createContext({ isReady: false })
export const useGoogleMaps = () => useContext(GoogleMapsContext)

interface GoogleMapsProviderProps {
  children: ReactNode
}

interface GoogleMapsProviderValue {
  isReady: boolean
}

export default function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'map',
    googleMapsApiKey: process.env.MAPS_KEY || '',
  })

  const providerValue: GoogleMapsProviderValue = useMemo(() => ({
    isReady: isLoaded,
  }), [isLoaded])

  return (
    <GoogleMapsContext.Provider value={providerValue}>
      {children}
    </GoogleMapsContext.Provider>
  )
}
