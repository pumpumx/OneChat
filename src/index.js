import connectDB from "./db/connectDB.js";
import dotenv from 'dotenv'
import app from "./app.js";

dotenv.config({
    path: "/.env"
})

connectDB()
.then(()=>{
    try {
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server running at port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`Error running at port ${process.env.PORT}`)
    }
})
.catch((err)=>{
    console.log("Error while connecting to database",err)
})

