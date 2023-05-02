import MapComponent from '@/components/MapComponent'
import TableComponent from '@/components/Table/TableComponent'
import NavBar from '@/components/NavBar'
import ChartComponent from '@/components/ChartComponent'

export default async function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-between">
        <div className="flex w-full">
          <MapComponent />
          <ChartComponent />
        </div>
        <div className="w-full">
          <TableComponent />
        </div>
      </main>
    </>
  )
}
