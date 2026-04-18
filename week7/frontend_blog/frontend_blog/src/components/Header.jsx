import { NavLink } from "react-router";
function Header() {
  const linkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
              BlogApp
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-6">
            <NavLink to="/" className={linkStyles}>
              Home
            </NavLink>
            <NavLink to="/register" className={linkStyles}>
              Register
            </NavLink>
            <NavLink to="/login" className={linkStyles}>
              Login
            </NavLink>
            
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;