
import {useContext} from 'react'
import {Context} from '../contexts/ContextProvider'
import {useCounterStore} from '../store/useCounterStore'
function Test() {
 
  //call useCounterStore hook to get state and functions of zustand store 
  const {newCounter,incrementCounter,decrementCounter,reset} = useCounterStore()

  const {counter,changeCounter}= useContext(Context)
  //console.log("Test")
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={changeCounter}>change counter</button>
    </div>
  )
}

export default Test