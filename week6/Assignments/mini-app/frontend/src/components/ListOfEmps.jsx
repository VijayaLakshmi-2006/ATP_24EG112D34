
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const [deleteErr, setDeleteErr] = useState('');
  const navigate = useNavigate()

  const gotoEmployee = (empObj) => {
    navigate("/employee", { state: empObj })
  }

  const gotoEditEmployee = (empObj) => {
    navigate("/edit-emp", { state: empObj })
  }

  const deleteEmployeeById = async (id) => {
    try {
      let res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/employees/${id}`)

      if (res.status === 200) {
        getEmps();
        setDeleteErr('');
      } else {
        setDeleteErr('Failed to delete employee');
      }
    } catch (error) {
      setDeleteErr(error.response?.data?.error || error.message || 'Error deleting employee');
    }
  }
  //get all employees
  async function getEmps() {
    let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/employees`);
    if (res.status === 200) {
      let resObj = res.data
      setEmps(resObj.employee || []);
    }
  }
  //get all employees on page load
  useEffect(() => {
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      {deleteErr && <p className="text-red-500 text-center text-xl my-4">{deleteErr}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {emps.map((empObj) => (
          <div key={empObj._id} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{empObj.name}</h3>
            <p className="text-gray-600 mb-6 break-all" title={empObj.email}>{empObj.email}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => gotoEmployee(empObj)} 
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded text-sm transition-colors"
              >
                View
              </button>
              <button 
                onClick={() => gotoEditEmployee(empObj)} 
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteEmployeeById(empObj._id)} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;
