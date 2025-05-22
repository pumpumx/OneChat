import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true,
    limit : "16kb"
}))
app.use(cors({
    origin:"http://localhost:5173",
    optionsSuccessStatus : 200,
    credentials: true
}))

app.use(cookieParser())


app.use(express.json(
    {limit:"40kb"}
))

//Routes
import userRoute from './routes/user.route.js'
import chatRouter from './routes/chat.routes.js'
import friendRouter from './routes/friend.routes.js'
app.use("/api/v1/users" , userRoute )
app.use("/api/v1/chat" , chatRouter)
app.use("/api/v1/friend",friendRouter)
export default app