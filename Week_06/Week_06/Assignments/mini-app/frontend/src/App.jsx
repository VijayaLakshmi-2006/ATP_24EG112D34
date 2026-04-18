import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import CreateEmp from './components/CreateEmp'
import ListOfEmps from './components/ListOfEmps'
import Employee from './components/Employee'
import EditEmployee from './components/EditEmployee'
import UserComponent from "./components/UserComponent"

import HomeAssign2 from "./components/Assign2/Home"

import RootLayoutAssign2 from "./components/Assign2/RootLayout"
import Assignment2 from "./components/Assignment2/User"
import Assignment3 from "./components/Assignment3/Assignment3"
import Header from "./components/Header"

const routerObj = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children:[
            { path: "", element: <Home/> },
            { path: "/create-emp", element: <CreateEmp/> },
            { path: "/list-of-emps", element: <ListOfEmps/> },
            { path:"/employee",element:<Employee/>},
            { path:"/edit-emp",element:<EditEmployee/>},
            {path:"/ass1",element:<UserComponent/>},
            {path:"/ass6",element:<HomeAssign2/>},
            {path:"/ass7",element:<RootLayoutAssign2/>},
            {path:"/Assignment2",element:<Assignment2/>},
            {path:"/Assignment3",element:<Assignment3/>},
            {path:"/Assignment4",element:<Header/>}

        ]
    }
]);

function App() {
  return (
    <div>
        <RouterProvider router={routerObj}/>
    </div>
  )
}

export default App
