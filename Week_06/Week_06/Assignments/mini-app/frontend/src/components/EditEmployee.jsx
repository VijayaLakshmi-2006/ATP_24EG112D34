
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation,useNavigate} from 'react-router'
import axios from 'axios'
import {useContext} from 'react'
import {Context} from '../contexts/ContextProvider'

function EditEmployee() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const { state } = useLocation()
  const navigate=useNavigate()
  const [updateErr, setUpdateErr] = useState('');
  const {counter,changeCounter} = useContext(Context)

  useEffect(() => {
    setValue("name", state.name)
    setValue("email", state.email)
    setValue("mobile", state.mobile)
    setValue("designation", state.designation)
    setValue("companyName", state.companyName)
  }, [])

   const saveModifiedEmployee=async(modifiedEmp)=>{
    console.log(modifiedEmp)
    try {
      let res=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/employees/${state._id}`,modifiedEmp)
      console.log(res)
      if(res.status===200){
        navigate("/list-of-emps")
      } else {
        setUpdateErr('Failed to update employee');
      }
    } catch (error) {
      setUpdateErr(error.response?.data?.error || error.message || 'Error updating employee');
    }
   }

  return (
    <div>
      <h1 className="text-5xl text-center text-black-600">Edit Employee</h1>
      {updateErr && <p className="text-red-500 text-center text-xl my-4">{updateErr}</p>}
      {/* form */}
      <form className=" max-w-md mx-auto mt-10 bg-white p-10 rounded-2xl shadow-2xl" onSubmit={handleSubmit(saveModifiedEmployee)}>
        <input
          type="text"
          placeholder="Enter name "
          {...register("name")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Enter Email "
          {...register("email")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <button type="submit" className="text-2xl rounded-2xl bg-green-600 text-white block mx-auto p-4">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditEmployee
