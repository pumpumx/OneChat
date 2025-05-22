import React from 'react'
import WithSuspense from '../WithSuspense'
import { UserRoundPlus } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { Search } from 'lucide-react'
import { fakeFriends } from '../constants.js'
import Navbar from './ChatNav.jsx'
function MainChat() {
  return (
    <>
      <div className='w-full h-screen bg-neutral-800 '>
        <div className='w-full h-full lg:w-[80%] mx-auto flex lg:flex-row '>
          <div className='lg:w-[30%] h-full bg-red-400'> {/* Private chat with friends feature */}
            <header className='w-full lg:h-[10%] bg-neutral-950 flex lg:flex-row items-center justify-between '>
              <span className='lg:w-[50%] lg:h-full flex flex-row items-center text-3xl pl-3 '><p className='text-white tiny5-regular font-bold '>OneChat</p></span>
              <span className='lg:w-[20%] flex items-center justify-center hover:cursor-pointer hover:scale-110 transition-all ease-out '>
                <UserRoundPlus color='white'/>
              </span>
            </header>
            <div className='lg:w-full lg:h-[90%] bg-green-700'>

              <div className='lg:w-full lg:h-[5%] bg-neutral-800 flex items-center justify-between'>  {/* Search query element*/}
                <div className='searchFriendInput lg:w-[80%] lg:h-full'>
                  <input type="text" className='w-full h-full bg-neutral-700 indent-3 outline-none caret-white font-semibold text-white' />
                </div>
                <div className='searchFriendsLogo lg:w-[20%] lg:h-[85%] flex items-center justify-center'>
                  <Search color='white' />
                </div>
              </div>

              <div className='lg:w-full lg:h-[95%] bg-neutral-950'>
                <div className='w-full h-full '> 
                  {fakeFriends.map((friend , index)=>(
                      <div key={index} className='w-full pixelify-sans-okish lg:h-[5rem] border-1 border-white/20  mb-[1px]  text-center lg:text-xl
                        hover:cursor-pointer hover:bg-white/25 transition-all
                      text-white font-normal bg-neutral-800'>
                        <span className='lg:w-full lg:h-full justify-center flex lg:flex-row items-center'><p className='text-white'>{friend.name}{console.log("friend" , friend)}</p></span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='mainRoom lg:w-[70%] bg-amber-400 h-full '>
            <div className='w-full h-[10%] bg-green-500'>
                  <Navbar/>
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