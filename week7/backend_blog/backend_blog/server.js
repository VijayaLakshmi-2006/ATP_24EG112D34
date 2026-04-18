import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/userAPI.js'
import { authorApp } from './APIs/authorAPI.js'
import { adminApp } from './APIs/adminAPI.js'
import { commonApp } from './APIs/commonAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
config()

const app = exp()

//add cookie parser middleware
app.use(cookieParser())
//body paser middleware
app.use(exp.json())

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))

app.use("/user", userApp)
app.use("/author", authorApp)
app.use("/admin", adminApp)
app.use("/auth", commonApp)

const connectDB = async () => {
    try {
        await connect(process.env.DB_URL)
        console.log("database connected")
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log(`server is running on port ${port}`)
        })
    }
    catch (error) {
        console.log("error is db connect ",error)
    }
}

connectDB()


//handle invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({ message: `path ${req.url} is invalid` });
});
app.get("/",(req,res)=>{
  res.send("hello world")
})
//to handle eerrors
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});
