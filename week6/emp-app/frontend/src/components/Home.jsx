import {useContext} from 'react'
import { countercontextobj } from '../contextprovider'
import { usecreatestore } from '../store/counterstore'
function Home() {
  let {newcounter,incrementcounter,decrementcounter}=usecreatestore
  const {counter,changecounter}=useContext(countercontextobj)
    const {counter1,changecounter1}=useContext(countercontextobj)
  return (
    <div>
      <h1 className='text-4xl'>counter:{counter}</h1>
      <button onClick={changecounter} className='bg-blue-400'>changecounter</button>
            <h1 className='text-4xl'>counter:{counter1}</h1>
      <button onClick={changecounter1} className='bg-blue-400'>changecounter1</button>
      <button onClick={incrementcounter}>incrementcounter</button>
      <button></button>
    </div>
  )
}

export default Home