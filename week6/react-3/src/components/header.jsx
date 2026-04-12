import { NavLink } from "react-router-dom"

function header() {
  return (
<nav className="p-5">
  <ul className="flex justify-end gap-4">
    <li>
      <NavLink to="/" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>home</NavLink>
    </li>
    <li>
      <NavLink to="/register" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>register</NavLink>
    </li>
    <li>
      <NavLink to="/login" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>login</NavLink>
    </li>
    <li>
      <NavLink to="/tech" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>tech</NavLink>
    </li>
  </ul>
</nav>
  )
}

export default header