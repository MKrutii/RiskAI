'use client'

import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import Asset from '@/types/asset'
import getDataByYear from '@/utils'
import { DataByYears } from '@/types/dataByYears'

interface AssetDataProviderProps {
  children: ReactNode
  assetsData: Array<Asset>
}

interface AssetDataProviderValue {
  activeYear: string
  activeAsset: string,
  activeYearData: Array<Asset>,
  dataByYears: DataByYears,
  onSetActiveYear: (v: string) => void,
  onSetActiveAsset: (v: string) => void,
}

const AssetDataContext: React.Context<any> = React.createContext(null)
export const useAssetData: () => AssetDataProviderValue = () => useContext(AssetDataContext)

export default function AssetDataProvider({ children, assetsData }: AssetDataProviderProps) {
  const [activeYear, setActiveYear] = useState<string>('2030')
  const [activeAsset, setActiveAsset] = useState<string>('Ware PLC')
  const [activeYearData, setActiveYearData] = useState<Array<Asset>>([])
  const [dataByYears, setDataByYears] = useState<DataByYears>({})

  useEffect(() => {
    if (assetsData?.length) {
      setActiveYearData(getDataByYear(assetsData)[activeYear])
      setDataByYears(getDataByYear(assetsData))
    }
  }, [assetsData, activeYear])

  const providerValue: AssetDataProviderValue = useMemo(() => ({
    activeYear,
    activeAsset,
    activeYearData,
    dataByYears,
    onSetActiveYear: setActiveYear,
    onSetActiveAsset: setActiveAsset,
  }), [activeYear, dataByYears, activeYearData, activeAsset])

  return (
    <AssetDataContext.Provider value={providerValue}>
      {children}
    </AssetDataContext.Provider>
  )
}
