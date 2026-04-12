import Header from "./header"
import Footer from "./footer"
import {Outlet} from "react-router-dom"
function Rootlayout() {
  return (
    <div>
        <Header />
        <div className="min-h-screen mx-16 bg-sky-100">
            <Outlet />
        </div>
        <Footer />


    </div>
  )
}

export default Rootlayout