import { createContext, useState } from 'react'

export const countercontextobj = createContext()

function ContextProvider({ children }) {
  const [counter, setCounter] = useState(10)
  const[counter1,setCounter1]=useState(20)

  const changecounter = () => {
    setCounter(counter+ 1)
  }
  const changecounter1 = () => {
    setCounter1(counter1+ 1)
  }

  return (
    <countercontextobj.Provider value={{ counter, changecounter }}>
      {children}
    </countercontextobj.Provider>
  )
}

export default ContextProvider