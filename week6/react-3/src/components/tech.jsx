
import { NavLink } from "react-router-dom"
function tech() {
  return (
<nav className="p-5">
  <ul className="flex justify-center gap-4">
    <li>
      <NavLink to="java" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>java</NavLink>
    </li>
    <li>
      <NavLink to="nodejs" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>nodejs</NavLink>
    </li>
    <li>
      <NavLink to="vue" className={({isActive})=>(isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>vue</NavLink>
    </li>

  </ul>
</nav>
  )
}

export default tech