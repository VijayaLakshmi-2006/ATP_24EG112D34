import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function RootLayout() {
     //import

    return (
        <div>
            <Header/>
            <div className='min-h-[80vh]'>
            <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout