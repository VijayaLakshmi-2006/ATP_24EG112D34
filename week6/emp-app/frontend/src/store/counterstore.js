import {create} from 'zustand'

export const usecreatestore=create((set)=>({
// state
newcounter:0,
newcounter1:100,
//add user state (name,age,email)
user:{name:"nilay",email:"nilay@gmail.com",age:21},
changeemail:()=>set({...user,email:"sreenilayreddy@gmail.com"}),
changename:()=>set({...user,name:"sreenilay"}),
changeage:()=>set({...user,age:19}),



// function modify the state
incrementcounter:()=>set(state=>({newcounter:state.newcounter+1})),
incrementcounter1:()=>set(state=>({newcounter1:state.newcounter1+1})),
decrementcounter:()=>set(state=>({newcounter:state.newcounter-1})),
reset:()=>set({newcounter:0}),
//function to change counter to 50
reset1:()=>set({newcounter:50}),
decrementcounter1:()=>set(state=>({newcounter:state.newcounter-20})),
}))