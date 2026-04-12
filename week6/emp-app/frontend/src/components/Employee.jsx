import React from 'react'
import { useLocation } from 'react-router'

function Employee() {
  const {state}=useLocation(); 
  return (
    <div className='bg-white p-3 text-center rounded-2xl shadow-2xl m-2 w-2xl'>
      <p>{state.name}</p>
      <p>{state.email}</p>
      <p>{state.mobile}</p>
      <p>{state.designation}</p>
      <p>{state.company}</p>
    </div>
  )
}

export default Employee