import { useState } from "react";
import "./UserComponent.css";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    DOB: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile || !formData.DOB) {
      alert("Please fill all fields");
      return;
    }

    setUsers([...users, formData]);

    setFormData({
      name: "",
      email: "",
      mobile: "",
      DOB: ""
    });
  };

  return (
    <div className="container mt-5">

      {/* FORM CARD */}
      <div className="card shadow-sm p-4 mb-4 form-card">
        <h5 className="text-center mb-3">Create User</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                type="email"
                name="email"
                className="form-control form-control-sm"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="mobile"
                className="form-control form-control-sm"
                placeholder="Enter Mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                type="date"
                name="DOB"
                className="form-control form-control-sm"
                value={formData.DOB}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 text-center">
              <button className="btn btn-primary btn-sm px-4" type="submit">
                Add User
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* TABLE CARD */}
      <div className="card shadow-sm border-0 mx-auto table-card">
        <div className="bg-dark p-2">
          <h6 className="text-white text-center m-0">User List</h6>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0 text-center align-middle custom-table">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>DOB</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td className="text-muted">{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.DOB}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted py-3">
                    No users added yet.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default UserComponent;