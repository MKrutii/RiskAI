import { API } from '@/config'

export default async function getAssets() {
  const res = await fetch(`${API}/assets`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
