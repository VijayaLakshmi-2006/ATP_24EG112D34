import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios'

function EditEmployee() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setValue("name", state.name);
      setValue("email", state.email);
      setValue("mobile", state.mobile);
      setValue("designation", state.designation);
      setValue("companyName", state.companyName);
    }
  }, [state, setValue]);

  const onFormSubmit = async (data) => {
    console.log("EditEmployee form submit:", data);

    if (!state || !state._id) {
      alert("Employee id is missing, cannot save.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:4000/emp-api/employees/${state._id}`, data);

      if (res.status === 200) {
        alert("Employee updated successfully");
        navigate("/list");
      } else {
        const msg = res?.data?.message || "Unknown error";
        alert(`Update failed: ${msg}`);
      }
    } catch (error) {
      console.error("EditEmployee save error:", error);
      alert("An error occurred while updating employee. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600">edit Employee</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10" onSubmit={handleSubmit(onFormSubmit)}>
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

        <button type="submit" className="text-2xl rounded-2xl bg-gray-600 text-white block mx-auto p-4">
          save
        </button>
      </form>
    </div>
  )
}

export default EditEmployee