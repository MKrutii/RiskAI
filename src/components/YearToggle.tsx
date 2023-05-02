'use client'

import React from 'react'
import cx from 'classnames'

import { useAssetData } from '@/components/Providers/AssetDataProvider'

export default function YearToggle() {
  const { activeYear, dataByYears, onSetActiveYear } = useAssetData()
  const handleChangeYear = (year: string) => {
    onSetActiveYear(year)
  }

  return (
    <div className="flex items-center">
      <div className="p-5">
        <p className="text-lg">Switch Year</p>
      </div>
      <div className="btn-group">
        {Object.keys(dataByYears).map(year => (
          <button
            key={year}
            className={cx('btn', activeYear === year && 'btn-active')}
            onClick={() => handleChangeYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}
