import React from 'react'

function Notify({ label=true , message="Successfull" , className="" }) {
//if true then success otherwise failure

  return (
    <div className={`w-[13rem] items-center h-[3rem] px-2 right-0 border-2 mt-[8rem]  absolute ${label?" border-green-300 text-green-500":"border-red-500 text-red-500"}  bg-white
    motion-translate-x-in-150 motion-ease-spring-smooth  rounded-lg overflow-x-hidden
     ${className}`}>
      <p className='text-sm text-center font-bold '>{message}</p>
    </div>
  )
}

export default Notify
