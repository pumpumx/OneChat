import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'



function Notify({ label=true , message="Successfull" , className="" }) {
//if true then success otherwise failure
  const notifyRef = useRef(null)

  useEffect(()=>{
    if(!notifyRef.current) return

    const element = notifyRef.current

    gsap.fromTo(element, {
      yPercent: -200,
      opacity:0
    },{
      yPercent:0,
      ease:'power1.inOut',
      duration:0.5,
      opacity:1,
    })
  },[])

  return (
    <div className='w-full h-screen flex relative bg-transparent justify-center'>   
    <div ref={notifyRef} className={`w-[40%] h-[12%] text-nowrap content-center text-center border-2 mt-3  
      absolute ${label?"bg-green-400 border-green-300 text-green-500 ":"border-red-500 text-red-500 bg-red-600"}  bg-white
      rounded-lg overflow-x-hidden
     ${className}`}>
      <p className='text-sm text-center font-bold '>{message}</p>
    </div>
   </div> 
  )
}

export default Notify
