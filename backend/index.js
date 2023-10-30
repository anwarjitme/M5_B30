const express=require("express")
const {connection}=require("./config/db")
const {  doctorRouter}=require("./routes/doctorRouter")
const { userRouter } = require("./routes/authRouter")
const app=express()

app.get("/",(req,res)=>{
     res.send(`AllAPI Routes of backned are listed bellow :
        
        Login backend API:"/login",
        Signup Backend API:"/signup",
        Doctor Dashboard APi:"/appointments"
        
     `)  
})
app.use(express.json());
app.use("/",doctorRouter)
app.use("/",userRouter)



app.listen(8080,async()=>{
   try{
await connection
console.log("connected with MongoDB")
    }catch(error){
console.log(error)
    }
    
}
)