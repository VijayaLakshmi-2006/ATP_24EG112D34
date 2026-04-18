import {createContext,useState} from 'react'

//create context provider object
export const Context = createContext()

function ContextProvider({children}) {
 //state
 const [counter,setCounter] = useState(10)
 const [counter1,setCounter1] = useState(20)
 //function
 const changeCounter = () => {
    setCounter(counter + 1)
 }
 const changeCounter1 = () => {
    setCounter1(counter1 + 1)
 }

 //return context provider object
 return (
    <h1>
    <Context.Provider value={{counter,changeCounter,counter1,changeCounter1}}>
        {children}
    </Context.Provider>
    </h1>
 )
}

export default ContextProvider