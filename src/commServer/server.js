import { Server } from "socket.io";
import { ApiError } from "../utils/apiError.js";
import http from 'http'
import { handleMessages } from "./messageHandler.js";
import app from "../app.js";
import jwt from 'jsonwebtoken'
let userSocketMap = new Map()
let io;
const serverInstance = async function () {
    try {
        const server = http.createServer(app)
        if(!server) throw new ApiError(404,"Failed to initialise a server")
        io = new Server(server, {
            cors: {
                origin: "*",
                credentials: true,
                methods: ['GET', 'POST']
            }
        })

        if (!io) throw new ApiError(500, "Failed to initialise a server", [{ status: 500, message: "Failed to initialise server" }])

        io.on('connection', (socket) => {
            console.log("User Connected with id", socket.id)

            const socketToken = socket.handshake.auth.token

            if (!socketToken) throw new ApiError(404, "Invalid Token")

            const user = jwt.verify(socketToken, process.env.SOCKET_AUTH_SECRET)

            userSocketMap.set(user.username, socket.id)

            if (!user) throw new ApiError(404, "Invalid User")

            handleMessages(socket, io, user) //Function for overall message handling!
            
            socket.on('disconnect', () => {
                for (let [uId, sId] of userSocketMap.entries()) {
                    if (sId === socket.id) {
                        userSocketMap.delete(uId);
                    }
                }
            })
        })

        server.listen(process.env.PORT , '0.0.0.0', ()=>{
            console.log("Server running")
        })
    } catch (error) {
        throw new ApiError(500, " Server error while establishing server", [{ message: "Failed to create socketIo server" }])
    }
}


export {
    serverInstance,
    userSocketMap,
    io
}
