import exp from 'express';
export const userApp=exp.Router()  //Router() is a method in Express used to create a mini express application.

//This is called test data.Later we connect to a real database like MySQL or MongoDB.
let users=[]

//Creating API(REST API - REpresentational state transfer(NO VERBS ONLY NOUNS))
//API contains routes (NOW lets take 4 types)
//Route to handle GET(all) req of client  get(path,req handler(callback fn))  (http://localhost:3000/users)
userApp.get('/users',(req,res)=>{
    res.json({message:"all users",payload:users})
})
//Route for specific "id"
userApp.get('/users/:id',(req,res)=>{
    let idOfUrl = Number(req.params.id)
    let user = users.find(temp=>temp.id===idOfUrl)
    res.json({message:"User by id",payload:user})
})
//Route to handle POST(create) req of client
userApp.post('/users',(req,res)=>{
    //get/read new user from client
    const newUser=req.body
    //console.log(newUser)
    //push user into users
    users.push(newUser)
    //send response
    res.json({message:"User is created"})
})
//Route to handle PUT(update) req of client
userApp.put('/users/:id',(req,res)=>{
    //to change string to number
    let idOfUrl = Number(req.params.id)
    //get modified user from client{}
    let modifiedUser=req.body;
    //get index of exiting user in users array
   let index= users.findIndex(temp=>temp.id===idOfUrl)
    //if user not found
    if(index===-1){
     return res.json({message:"User not found"})
    }
      //update user with index  {1 means delete existing and add modifiedUser }
    users.splice(index,1,modifiedUser)
    //sends res 
    res.json({message:"User Updated"})
})
//Route to handle DELETE req of client
    userApp.delete('/users/:id',(req,res)=>{
       //get id of user from url parameter
          let idOfUrl=Number(req.params.id) //{id : '5'}
          // find indx of user
          let index=users.findIndex(temp=>temp.id===idOfUrl)
          //if user not found
          if(index===-1){
     return res.json({message:"User not found to delete"})
    }
      //delete user with index 
    users.splice(index,1)
    //sends res 
    res.json({message:"User removed"})
})
   
// (npm install -g nodemon)  used for not to restart again and again(changes can be modified directly)
//after installation use , (nodemon (filename)) or else (npmx  ) 



// server.js → identifies API group
// router → identifies specific route
