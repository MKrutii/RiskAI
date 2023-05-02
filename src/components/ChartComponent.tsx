'use client'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

import { useAssetData } from '@/components/Providers/AssetDataProvider'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

export default function ChartComponent() {
  const { activeAsset, activeYearData } = useAssetData()
  const color = faker.color.rgb()
  const selectedDataset = [
    {
      label: activeAsset,
      data: activeYearData.filter(a => a['Asset Name'] === activeAsset).map(e => e['Risk Rating']),
      borderColor: color,
      backgroundColor: color,
    },
  ]

  const formattedData = {
    labels,
    datasets: selectedDataset,
  }

  return (
    <div className="w-[50%] h-[500px] flex items-end">
      <Line options={options} data={formattedData} />
    </div>
  )
}
