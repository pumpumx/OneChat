import connectDB from "./db/connectDB.js";
import dotenv from 'dotenv'
import {serverInstance} from "./commServer/server.js";
dotenv.config({
    path: "/.env"
})

await connectDB()
.then(()=>{
    try {
        serverInstance()
    } catch (error) {
        console.log(`Error running at port ${process.env.PORT}`)
    }
})
.catch((err)=>{
    console.log("Error while connecting to database",err)
})


