import React, { Suspense, useState } from 'react'
import ChatMessage from './ChatMessage'
import Navbar from './ChatNav.jsx'
import SideChatBar from './sideChatBar.js'
import { ToastContainer } from 'react-toastify'
import PersonalChatMessage from './PersonalChatMessage.jsx'
import Spinner from '../Utils/Spinner.jsx'
function MainChat() {
  const [roomOrPersonal ] = useState(false)


  return (
    <>
      <div className='w-full h-screen bg-neutral-800 '>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
        <div className='w-full h-full lg:w-[80%] mx-auto flex lg:flex-row '>
          <SideChatBar />
          <div className='mainRoom lg:w-[70%]  h-full '>
            <div className='w-full h-[10%] '>
              <Navbar />
            </div>
            <div className='lg:w-full lg:h-[90%] h-full '>
              <Suspense fallback={<Spinner/>}>
              {roomOrPersonal ? <ChatMessage/>:<PersonalChatMessage/>}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainChat