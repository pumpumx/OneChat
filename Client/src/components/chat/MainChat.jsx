import React from 'react'
import WithSuspense from '../WithSuspense'
import ChatNav from './ChatNav'
import { lazyMessage, lazyServer } from '../LazyComp'
function MainChat() {
  return (
    <>
        <div className='w-full h-screen bg-black '>
            <div className='w-full h-[3.5rem] mb-10 bg-amber-300'>
                <ChatNav />
            </div>
            <div className='w-[80%] px-5 py-5 h-[80%] flex mx-auto bg-green-700 items-center justify-between'>
                <div className='w-[40%] h-[70%] bg-amber-700 justify-start'>
                    {WithSuspense(lazyMessage)}
                </div>
                <div className='w-[40%] h-full bg-red-400  '>
                    {WithSuspense(lazyServer)}
                </div>
            </div>
        </div>
    </>
  )
}

export default MainChat