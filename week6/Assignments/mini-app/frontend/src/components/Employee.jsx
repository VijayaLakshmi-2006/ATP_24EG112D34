
import { useLocation } from 'react-router'

function Employee() {
  const { state } = useLocation();

  return (
    <div className="p-16 text-center text-3xl flex flex-col gap-5 bg-white border-2 rounded-2xl shadow-2xl max-w-md mx-auto ">
      <p className="text-2xl">Name:{state.name}</p>
      <p className="text-2xl">Email:{state.email}</p>
      <p className="text-2xl">Mobile:{state.mobile}</p>
      <p className="text-2xl">Designation:{state.designation}</p>
      <p className="text-2xl">Company Name:{state.companyName}</p>
    </div>
  )
}

export default Employee
