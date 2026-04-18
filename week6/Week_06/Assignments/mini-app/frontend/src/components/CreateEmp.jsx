import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from 'react'
import { Context } from '../contexts/ContextProvider'

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { counter1, changeCounter1 } = useContext(Context)
  console.log("create emp component rendered")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form submit
  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      //make HTTP POST req//dotenv BACKEND_URL
      let res = await fetch(import.meta.env.VITE_BACKEND_URL + "/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        //navigate to employees component programatically
        navigate("/list-of-emps");
      } else {
        let errorRes = await res.json();
        console.log("error responce is ", errorRes);
        throw new Error(errorRes.error || "Unknown error occurred");
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(error);

  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Employee</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>
        {/* Grid for compact layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-bold text-gray-600 ml-1">Full Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="border-2 px-3 py-2 w-full rounded-xl !text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-bold text-gray-600 ml-1">Email Address</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border-2 px-3 py-2 w-full rounded-xl !text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="text-sm font-bold text-gray-600 ml-1">Mobile Number</label>
            <input
              id="mobile"
              type="number"
              {...register("mobile")}
              className="border-2 px-3 py-2 w-full rounded-xl !text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="designation" className="text-sm font-bold text-gray-600 ml-1">Designation</label>
            <input
              id="designation"
              type="text"
              {...register("designation")}
              className="border-2 px-3 py-2 w-full rounded-xl !text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="companyName" className="text-sm font-bold text-gray-600 ml-1">Company Name</label>
          <input
            id="companyName"
            type="text"
            {...register("companyName")}
            className="border-2 px-3 py-2 w-full rounded-xl !text-sm focus:border-blue-500 outline-none transition-all"          />
        </div>

        <button type="submit" className="text-xl font-bold rounded-xl bg-gray-800 text-white block mx-auto px-10 py-3 mt-4 hover:bg-black transition-colors shadow-md">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default CreateEmp;










/*
GET
 fetch(endpoint,{method:"GET"})

POST
 fetch(endpoint,{method:"POST",
                 headers:{"Content-Type":app/json}
                 body:JSON.strigy(resource)
                 })
*/

/*can avoid extra check of the errors in axios
but need to install and import 
GET
 axios.get(endpoint)

POST
 axios.put(endpoint,resource})
*/
