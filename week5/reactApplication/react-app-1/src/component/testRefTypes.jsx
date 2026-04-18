import {useState} from "react";

function Counter(){
    //state 
    const [user,setUser]=useState({userName:"Pallavi",age:19,marks:90});
    const [marks,setMarks]=useState([80,40,50,60,70]);
    
    //update user state
    const updateUserName=()=>{
        setUser({...user,userName:" Manasa "});
    }
    const updateAge=()=>{
        setUser({...user,age:16});
    }
    const updateMarks=()=>{
        setUser({...user,marks:60});
    }
    return(
        <div>
            <h1>{user.userName}</h1>
            <h1>{user.age}</h1>
            <h1>{user.marks}</h1>
            <button onClick={updateUserName}>
            Update User Name
            </button>
            <button onClick={updateAge}>
            Update Age
            </button>
            <button onClick={updateMarks}>
            Update Marks
            </button>
        </div>
    )
}