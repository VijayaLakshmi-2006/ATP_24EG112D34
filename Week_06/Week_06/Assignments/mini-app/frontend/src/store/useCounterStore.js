import {create} from 'zustand'
//create a global store
 export const useCounterStore = create((set=>({
  //state 
  newCounter:0,
  newCounter1:100,
  //add userstate (name,age,email)
  user:{name:"Pallavi",age:18,email:"pallavi@gmail.com "},
  //function change email
  changeEmail:()=>set({...user,email:"test@gmail.com"}),
  //function change age
changeAge:()=>set({user:{...user,age:20}}),
//function change name
changeName:()=>set({user:{...user,name:"Pallavi"}}),

  //functions to modify state
  incrementCounter:()=>set((state)=>({newCounter:state.newCounter+1})),
  incrementCounter1:()=>set((state)=>({newCounter1:state.newCounter1+1})),
  decrementCounter:()=>set((state)=>({newCounter:state.newCounter-1})),
  decrementCounter1:()=>set((state)=>({newCounter1:state.newCounter1-1})),
  reset:()=>set({newCounter:0}), //state is not required here because we are not using previous state value 
  
  //function to change newCounter to 500
  changeNewCounterTo500:()=>set({newCounter:500}),
  //function to decrement newCounter by 20
  decrementNewCounterBy20:()=>set((state)=>({newCounter:state.newCounter-20})),
 }))) 

