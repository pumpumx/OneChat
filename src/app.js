import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true,
    limit : "16kb"
}))
app.use(cookieParser())
app.use(cors({
    origin:"*",
    optionsSuccessStatus : 200,
    credentials: true
}))
app.use(express.json(
    {limit:"40kb"}
))


//Routes
import userRoute from './routes/user.route.js'

app.use("/api/v1/users" , userRoute )

export default app