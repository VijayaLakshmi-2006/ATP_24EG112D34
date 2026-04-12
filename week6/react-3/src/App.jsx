import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Rootlayout from "./components/rootlayout"
import Home from "./components/home"
import Register from "./components/register"
import Login from "./components/login"
import Tech from "./components/tech"
import Java from "./components/java"
import Nodejs from "./components/nodejs"
import Vue from "./components/vue"
function App() {
//adding routing config
const routerobj=createBrowserRouter([
    {
        path:"/",
        element:<Rootlayout />,
        children:[

            {
                path:"",
                element:<Home />
            },
            {
                path:"register",
                element:<Register />
            },
            {
                path:"login",
                element:<Login />
            },
            {
                path:"tech",
                element:<Tech />,
                children:[
                                {
                index:true,
                element:<Java/>
            },
                    {
                    path:"java",
                    element:<Java />
                },
                {
                    path:"nodejs",
                    element:<Nodejs />
                },
                {
                    path:"vue",
                    element:<Vue />
                }
            ]
            }
        ]
    }
])
  return (
    <RouterProvider router={routerobj}/>
  )
}

export default App