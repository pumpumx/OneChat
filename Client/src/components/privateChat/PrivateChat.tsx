import React, { useEffect, useState } from 'react'
import { clientConnectionInstance } from '../../hooks/useServer.js'
import { clientSocket } from '../../hooks/useServer.js'
import { sendPrivateMessage } from '../../hooks/clientMessageHandler.js'
import ChatHistory from '../chat/ChatHistory.jsx'
import { usePrevMessageLoad } from '../../hooks/usePrevMessageLoad.js'

function PrivateChat() {
  const [message, setMessage] = useState("")
  const [username , setUsername] = useState('pupi')   //Work on it so that it handles username!! 
  usePrevMessageLoad()
  
  useEffect(() => {
    
    clientConnectionInstance()

    return () => {
      if (clientSocket) {
        clientSocket.disconnect();
      }
    }
  }, [])

  return (
    <>
      <div className='w-full h-full bg-gray-800 px-2 flex flex-col justify-around '>
        <div className='w-full h-[80%] overflow-auto scroll-smooth '>
          <ChatHistory />
        </div>

        <div className=' w-full flex gap-0 h-[3rem] justify-between items-center bg-white'>
          <div className="messageBar w-[70%] left-0 h-full ">
            <input type="text" id="123"
              className='w-full h-full bg-gray-500 text-white indent-2 '
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <button className='bg-green-500 hover:bg-[#6cbe6cea] w-[30%] h-full cursor-pointer '
            onClick={() => sendPrivateMessage(message , username)}
          >Click ME to send privateMessage</button>
        </div>
      </div>
    </>
  )
}

export default PrivateChat