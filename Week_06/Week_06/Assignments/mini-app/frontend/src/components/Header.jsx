
import { NavLink } from 'react-router'

function Header() {
  return (
    <div>
      <nav className='p-7 bg-gray-300 text-white'>
        <ul className='flex justify-end text-3xl gap-5'>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-yellow-500" : "")}> Home</NavLink>
          </li>
          <li>
            <NavLink to="/create-emp" className={({ isActive }) => (isActive ? "text-yellow-500" : "")}>Create Employee</NavLink>
          </li>
          <li>
            <NavLink to="/list-of-emps" className={({ isActive }) => (isActive ? "text-yellow-500" : "")}>List of Employees</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header