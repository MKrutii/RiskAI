import Asset from '@/types/asset'
import { DataByYears } from '@/types/dataByYears'

export default function getDataByYear(data: Array<Asset>): DataByYears {
  return data.reduce(
    (acc: DataByYears, e) => {
      const id = Math.random().toString(20).substring(2)
      const next = { ...e, id }
      return ({
        ...acc,
        [e.Year]: acc[e.Year] ? [...acc[e.Year], next] : [next],
      })
    },
    {},
  )
}
