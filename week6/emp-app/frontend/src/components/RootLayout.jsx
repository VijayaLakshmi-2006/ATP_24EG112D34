import Header from './Header'
import { Outlet } from 'react-router'
import ContextProvider from '../contextprovider'

function RootLayout() {
  return (
    <ContextProvider>
      <div>
        <Header />
        <div className='min-h-screen mx-20 p-20 bg-gray-100'>
          <Outlet />
        </div>
      </div>
    </ContextProvider>
  )
}

export default RootLayout