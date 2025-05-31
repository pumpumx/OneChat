import React from 'react'
import MainScreen from './components/MainScreen'
import CenterScreen from './components/CenterScreen'
import VideoSection from './components/VideoSection'
function LandingPage() {
  return (
    <>
      <div className='w-full ' >
      <video muted autoPlay={true} loop playsInline className='fixed top-0 left-0 -z-1'>
            <source src='/starBg.mp4' type='video/mp4' />            
          </video>
        <div className='w-full h-[100vh] '>
         
          <MainScreen />
        </div>
        <div className='w-full  h-[100vh]'> {/* This part mostly have constant values therefore not making it into a seperate component   */}
          <div className='w-full h-[100vh] z-10'>
            <CenterScreen />
          </div>
        </div>
        <div className='w-full  h-[200vh]  z-0 '>
            <VideoSection />
          </div>
          <div className='w-full h-[100vh]'>

          </div>
      </div>

    </>

  )
}

export default LandingPage  