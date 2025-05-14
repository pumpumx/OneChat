import { io } from "socket.io-client";
import { recieveMessage } from "./clientMessageHandler.js";
import { authMethod } from "../auth_api/user.auth.js";
let clientSocket = null;
const clientConnectionInstance = async () => {
  try {

    const socketToken = await authMethod.socketAuth()

    if (!clientSocket || !clientSocket.connected) {
      const socket = io("http://localhost:8000/" , {
        auth: {token : socketToken},
        reconnectionAttempts: 5,
        timeout: 5000,
      })

      clientSocket = socket;
       
    }

    clientSocket.on("connect" , ()=>{
      console.log("User Connected with id: ", clientSocket.id);
    })

    clientSocket.on("disconnect" , ()=>{
      console.log("User disconnected with id: ", clientSocket.id);
    })

    recieveMessage();

  }
  catch (error) {
    console.log("Error while Client connection", error)
    return error.errors
  }
}


export {
  clientConnectionInstance,
  clientSocket,
}