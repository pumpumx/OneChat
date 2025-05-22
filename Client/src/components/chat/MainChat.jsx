import React from 'react'
import ChatMessage from './ChatMessage'
import Navbar from './ChatNav.jsx'
import SideChatBar from './sideChatBar.js'
function MainChat() {


  return (
    <>
      <div className='w-full h-screen bg-neutral-800 '>
        <div className='w-full h-full lg:w-[80%] mx-auto flex lg:flex-row '>
          <SideChatBar />
          <div className='mainRoom lg:w-[70%] bg-amber-400 h-full '>
            <div className='w-full h-[10%] bg-green-500'>
              <Navbar />
            </div>
            <div className='lg:w-full lg:h-[90%] '>
              <ChatMessage />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainChat