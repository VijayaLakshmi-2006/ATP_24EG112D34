
import { useForm } from "react-hook-form";
import { useState } from "react";

function CreateUsers(){
  const [users,setUsers]=useState([])
  const {register,handleSubmit}=useForm()

}
//on form submit
const onFormSubmit=(newUserObj)
  const [users, setUsers] = useState([]);

  // form submit function
  const onFormSubmit = (obj) => {
    console.log(obj);
    setUsers((prev) => [...prev, obj]); // add new user to state
  };

  return (
    <div>
      <h1 className="text-center text-5xl">Form Demo</h1>

      {/* form */}
      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="firstname">Username</label>
          <input
            type="text"
            {...register("firstname", {
              required: "first name required",
              validate: (v) => v.trim().length !== 0 || "not valid",
              minLength: { value: 4, message: "min of length 4 characters" },
            })}
            id="firstname"
            className="border w-full p-3"
          />
          {errors.firstname && (
            <p className="text-red-800 text-2xl">first name required</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: "mail required" })}
            id="email"
            className="border w-full p-3"
          />
          {errors.email && (
            <p className="text-red-800 text-2xl">mail required</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dateofbirth">Date of Birth</label>
          <input
            type="date"
            {...register("dateofbirth", { required: "date of birth required" })}
            id="dateofbirth"
            className="border w-full p-3"
          />
          {errors.dateofbirth && (
            <p className="text-red-800 text-2xl">eppud puttinav</p>
          )}
        </div>

        <button
          type="submit"
          className="p-4 block bg-amber-300 text-center mx-auto"
        >
          kottu
        </button>
      </form>

      {/* table of users */}
      {users.length > 0 && (
        <div className="mt-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-5 text-center">List of Users</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">First Name</th>
                <th className="border border-gray-400 p-2">Email</th>
                <th className="border border-gray-400 p-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">
                    {user.firstname}
                  </td>
                  <td className="border border-gray-400 p-2">{user.email}</td>
                  <td className="border border-gray-400 p-2">
                    {user.dateofbirth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FormDemo1;