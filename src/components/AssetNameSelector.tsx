'use client'

import React, { ChangeEvent, useMemo } from 'react'

import { useAssetData } from '@/components/Providers/AssetDataProvider'

export default function AssetNameSelector() {
  const { onSetActiveAsset, activeYearData, activeAsset } = useAssetData()

  const options: Set<string> = useMemo(() => new Set([
    ...activeYearData.map(a => a['Asset Name']),
  ]), [activeYearData])
  const handleSelectAsset = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist()
    onSetActiveAsset(e.currentTarget.value)
  }

  return (
    <div className="flex items-center">
      <label className="p-5">
        <span className="text-lg">Switch Asset</span>
      </label>
      <select className="select select-bordered" onChange={handleSelectAsset}>
        {Array.from(options).map(name => (
          <option key={name} selected={name === activeAsset}>{name}</option>
        ))}
      </select>
    </div>
  )
}
