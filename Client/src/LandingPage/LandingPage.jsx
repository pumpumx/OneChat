import React from 'react'
import MainScreen from './components/MainScreen'
import CenterScreen from './components/CenterScreen'
import VideoSection from './components/VideoSection'
import BottomSection from './components/BottomSection'
import Footer from './components/Footer'
import { Suspense } from 'react'
import VanishSpinner from '../components/Spinner/Spinner.jsx'
function LandingPage() {
  return (
    <>
    <Suspense fallback={<VanishSpinner/>}>
      <div className='w-full bg-neutral-950 2xl:bg-transparent ' >
      <video muted autoPlay={true} loop playsInline className=' fixed top-0 left-0 -z-1 ' preload='auto'>
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
        <div className='w-full h-[250vh] z-0 '>
            <VideoSection />
          </div>
          <div className='w-full h-[200vh] z-0'>
              <BottomSection />
          </div>
          <div>
              <Footer/>
          </div>
      </div>
      </Suspense>
    </>
  )
}

export default LandingPage  