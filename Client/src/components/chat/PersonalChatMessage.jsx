import React, { useEffect, useRef, useState } from 'react'
import { clientConnectionInstance } from '../../hooks/useServer.js'
import { clientSocket } from '../../hooks/useServer.js'
import {  sendPrivateMessage } from '../../hooks/clientMessageHandler.js'
import PersonalChatHistory from './personalChatHistory.jsx'
import { Plus } from 'lucide-react'

import { Mic } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import {rotatePlus,rotateCross} from './chatAnimations.js'
import { friendChattingWithData } from '../../atoms/friendAtom.js'
import { useAtom } from 'jotai'
import { usePersonalChatLoad } from '../../hooks/usePrevMessageLoad.js'
function ChatMessage() {
  const [friendData] = useAtom(friendChattingWithData)
  const rotateRef = useRef(null)
  
  const [message, setMessage] = useState("")
  const [docToggle , setDocToggle] = useState(false)

  const rotateHandler = ()=>{
    setDocToggle(!docToggle)
    if(docToggle === true){
      rotatePlus(rotateRef)
    }
    else{
      rotateCross(rotateRef)
    }
  }
  usePersonalChatLoad() // Initially loads the message as the component is mounted..
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
      <div className='w-full h-full  flex flex-col justify-between bg-[url(/chatBg2.gif)] bg-cover'>
        <div className='w-full h-[80%] overflow-auto scroll-smooth text-white flex flex-col justify-center items-center text-3xl px-10 lg:text-xl pixelify-sans-okish'>
          <PersonalChatHistory />
        </div>
        <div className='w-full lg:h-[7%] p-2  bg-neutral-700 flex lg:flex-row items-center justify-center '>
          <div className='plus lg:w-[5%] lg:h-full  flex items-center justify-center'>
            <Plus color='gray' size={28} ref={rotateRef} onClick={()=>rotateHandler()}/>
          </div>
            <div className="messageBar lg:w-[90%] left-0 h-full ">
              <input type="text" id="123"
                className='w-full h-full bg-gray-500 text-white indent-2 rounded-md '
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className='lg:w-[5%] lg:h-full flex lg:flex-row items-center justify-center'>
            <button className='rounded-md  w-[70%] h-full cursor-pointer flex items-center justify-center '
              onClick={() => sendPrivateMessage(message , friendData)}
            >{message.trim() === ''?<Mic color='gray'/>:<SendHorizontal color='gray'/>}</button>
            </div>            
          </div>
        </div>
    </>
  )
}

export default ChatMessage