import { io } from "socket.io-client";
let clientSocket = null;
const clientConnectionInstance = async () => {
  try {
    if (!clientSocket || !clientSocket.connected) {
      const socket = io("http://localhost:8002/" , {
        reconnectionAttempts: 5,
        timeout:2000,
      })
      clientSocket = socket;

      
      //Change this static port 
    }
  }
  catch (error) {
    console.log("Error while Client connection", error)
    return error.errors
  }
}

const sendMessage = (recieverId , data)=>{
  clientSocket.to(recieverId).emit('send_message',data)
}

export {
  clientConnectionInstance,
  clientSocket,
  sendMessage
}