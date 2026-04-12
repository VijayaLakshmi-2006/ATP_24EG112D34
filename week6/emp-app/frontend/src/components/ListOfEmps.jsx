import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate=useNavigate();

  const gotoemployee = (empObj) => {
    navigate("/employee", { state: empObj });
  };

  const gotoeditemployee = (empObj) => {
    navigate("/edit-emp", { state: empObj });
  };

  const fetchEmps = async () => {
    let res = await fetch("http://localhost:4000/emp-api/employees");
    if (res.status === 200) {
      let resObj = await res.json();
      setEmps(resObj.payload);
    }
  };

  const deleteEmployee = async (empId) => {
    if (!window.confirm("Do you really want to delete this employee?")) return;

    try {
      const res = await fetch(`http://localhost:4000/emp-api/employees/${empId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        await fetchEmps();
      } else {
        const err = await res.json();
        alert(`Delete failed: ${err.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("deleteEmployee error:", error);
      alert("Error deleting employee. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5 text-center rounded-2xl shadow-2xl m-3 w-56">
            <p>{empObj.email}</p>
            <p className="m-2">{empObj.name}</p>
            {/* 3 buttons */}
            <div className="flex justify-around"> 
            <button onClick={() => gotoemployee(empObj)} className="bg-blue-500 text-white p-2 rounded-2xl">view</button>
            <button onClick={() => gotoeditemployee(empObj)} className="bg-orange-500 text-white p-2 rounded-2xl">edit</button>
            <button onClick={() => deleteEmployee(empObj._id)} className="bg-red-500 text-white p-2 rounded-2xl">delete</button>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;
