'use client'

import React, { useMemo } from 'react'
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function ChartComponent() {
  const { activeAsset, activeYearData } = useAssetData()

  const footer = (tooltipItems: Array<any>) => {
    const [current] = tooltipItems
    const currentData = current.dataset.filteredData[current.dataIndex]

    return `
      Business Category: ${currentData['Business Category']}\n
      Risk Rating: ${currentData['Risk Rating']}\n
      ${Object.entries(currentData['Risk Factors'])
    .map(([label, val]) => `${label}: ${Number(val).toFixed(2)}`)
    .join('\n')}
      Year: ${currentData.Year}
    `
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          footer,
        },
      },
    },
  }
  const color = useMemo(() => faker.color.rgb(), [])
  const filteredData = activeYearData.filter(a => a['Asset Name'] === activeAsset)
  const selectedDataset = [
    {
      label: activeAsset,
      filteredData,
      data: filteredData.map(e => e['Risk Rating']),
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
