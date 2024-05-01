import './App.css'
import NavBar from './components/NavBar'
import BarChartPage from './pages/BarChartPage'
import Dashboard from './pages/Dashboard'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import GeoHeatMap from './pages/GeoHeatMap'
function App() {
  const Layout = () => {
    return (
      <div className='w-full flex  '>
        <NavBar />
        <main className='flex-grow flex-[1] bg-[#F2F7FF]'>
          <Outlet />
        </main>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/geoHeatMap',
          element: <GeoHeatMap />
        },
        {
          path: '/barchart',
          element: <BarChartPage />
        },

      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
