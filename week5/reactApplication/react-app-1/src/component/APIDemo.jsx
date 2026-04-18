
// import {useEffect,useState} from "react"
// import "./App.css";
// function APIDemo(){
//     console.log("API Demo component is rendered")
//     let [users,setUsers]=useState([])
//     let [loading,setLoading]=useState(false)
//      const [error, setError] = useState(null);
     
//     useEffect(()=>{
//        //a function to make api req
//        async function getData(){
//         //set loading to true
//         setLoading(true)
//         try{
//          let res=await fetch("https://jsonplaceholder.typicode.com/users")
//          let usersList=await res.json()
//          //console.log(usersList)
//          //update state
//          setUsers(usersList)

//         }catch(err){
//             console.log("err is :",err)
//             //update the error state
//             setError(err)
//         }
//        }
       
//        getData()
//     },[])  

// function APIDemo() {
//   console.log("API rerendered");

  
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       setLoading(true);
//       try {
//         let res = await fetch("https://jsonplaceholder.typicode.com/comments");
//         let usersList = await res.json();
//         setUsers(usersList);
//       } catch (err) {
//         console.log("Error is", err);
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     }
// //call 
//     getData();
//   }, []);      
//     console.log("API Demo component is rendered")

// //deal with loading state
//     if(loading) return <p className="text-center text-5xl text-shadow-amber-600">Loading...</p>
//     //deal with error state
//     if(error!==null) return <p className="text-center text-5xl text-shadow-red-700">{error}</p>
//     return(
//         <div>
//            <h1>Users List</h1>
          
//             {users.map((userObj)=>(
//                 <div>
//                     <p>{userObj.id}</p>
//                     <p>{userObj.name}</p>
//                     <p>{userObj.email}</p>
//                 </div>
//                 ))}
           
         
//         </div>
//     )   
// }
// export default APIDemo;




// import { useState,useEffect } from "react";

// function APIDemo(){
//     let [users,setUsers] = useState([])
//     let[loading,setLoading]= useState(false)
//     let[error,seterror]= useState(null)
      
//     useEffect(()=>{
//         //a function to make api req
//         async function getdata(){
//             setLoading(true)
//             try{
//                 let res = await fetch("https://jsonplaceholder.typicode.com/posts")
//                 let usersList = await res.json();
//                 //update state
//                 setUsers(usersList)
//             }
//             catch(err)
//             {
//                 console.log("err is",err)
//                 seterror(err)
//             }
//             finally{
//                setLoading(false)
//             }
//         }
//         getdata()
//     },[])          //  (()=>{},[])   ---> [] if we donot use this rendering happens multiple times with many api calls and exceeds the limit of api calls

//     //deal with loading
//     if(loading){
//         return <p className="text-center text-5xl">Loading...</p>
//     }
//     //deal with errors
//     if(error!=null)
//     {
//         return <p className="text-center text-red-500 text-5xl">{error.message}</p>
//     }
//     return(
//         <div className="text-center mt=10">
//             <h1 className="text-6xl text-blue-400">Users List</h1>
//             <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//                {users.map((userObj)=>(
//                 <div key={userObj.id}>
//                     <p>{userObj.title}</p>
//                     <p>{userObj.body}</p>
//                     </div>
//                )
//             )}
//             </div>
//         </div>
//     )
// }
// export default APIDemo


import apiDemo from "./components/apiDemo";
export default function APIDemo() {
  return (
    <div>
      <h2>API Demo Component</h2>
      <p>This is a placeholder for your API demo.</p>
    </div>
  );
}



