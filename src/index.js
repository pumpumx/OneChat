import connectDB from "./db/connectDB.js";
import dotenv from 'dotenv'
import app from "./app.js";
import {serverInstance} from "./commServer/server.js";
import { ApiError } from "./utils/apiError.js";

dotenv.config({
    path: "/.env"
})

await connectDB()
.then(()=>{
    try {
        app.listen(process.env.PORT || 8200, '0.0.0.0', ()=>{
            console.log(`Databse Server running at port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`Error running at port ${process.env.PORT}`)
    }
})
.catch((err)=>{
    console.log("Error while connecting to database",err)
})

serverInstance()
