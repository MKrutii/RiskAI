'use client'

import React, { useState } from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'

import { useGoogleMaps } from '@/components/Providers/GoogleMapProvider'
import { useAssetData } from '@/components/Providers/AssetDataProvider'
import { getMarkerColor, markerSVG } from '@/utils/map'
import Asset from '@/types/asset'

export default function MapComponent() {
  const [tooltipData, setTooltipData] = useState<Asset|null>(null)
  const [position, setPosition] = useState({
    lat: 50.26729,
    lng: -119.27337,
  })

  const { activeYearData, onSetActiveAsset } = useAssetData()
  const { isReady } = useGoogleMaps()

  const handleMarkerClick = (asset: Asset) => {
    onSetActiveAsset(asset['Asset Name'])
    setPosition({
      lat: asset.Lat,
      lng: asset.Long,
    })
    setTooltipData(asset)
  }

  return isReady ? (
    <div className="w-[50%] h-[500px] mr-5 mb-5">
      <GoogleMap
        center={{
          lat: 50.26729,
          lng: -119.27337,
        }}
        mapContainerStyle={{
          width: '100%',
          height: '500px',
        }}
        zoom={4}
      >
        {activeYearData.map((asset: Asset) => (
          <Marker
            key={asset.id}
            title={asset['Business Category']}
            position={{
              lat: asset.Lat,
              lng: asset.Long,
            }}
            icon={{
              ...markerSVG,
              fillColor: getMarkerColor(asset['Risk Rating']),
            }}
            onClick={() => handleMarkerClick(asset)}
          />
        ))}

        {tooltipData && (
          <InfoWindow
            position={position}
            onCloseClick={() => setTooltipData(null)}
          >
            <div className="card w-30 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Info</h2>
                <p>Asset Name : <span>{tooltipData['Asset Name']}</span></p>
                <p>Business Category : <span>{tooltipData['Business Category']}</span></p>
                <p>Year : <span>{tooltipData.Year}</span></p>
                <p>Risk Rating : <span>{tooltipData['Risk Rating']}</span></p>
                <p>Risk Factors :</p>
                <ul>
                  {Object.entries(tooltipData['Risk Factors']).map(([label, value]) => (
                    <li key={label}>
                      <p className={'italic'}>{label} : <span>{value}</span></p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className={'flex justify-center items-center w-[50%] h-[500px]'}>
      <span>Map is loading...</span>
    </div>
  )
}
