import React, { useEffect, useRef, useState } from 'react'
import { MouseParallax } from 'react-just-parallax'


function MainScreen() {
  const firstContainerRef = useRef(null)
  const [aboveBarOpen, setAboveBarOpen] = useState(false)
  const abovePanelRef = useRef(null)

  const abovePanelHandler = () => {
    setAboveBarOpen(!aboveBarOpen)
  }

  useEffect(() => {
    const element = abovePanelRef.current

    if (aboveBarOpen) {
      gsap.to(element, { height: '50%', opacity: 1, duration: 0.5, ease: 'power2.out' })
    } else {
      gsap.to(element, { height: 0, opacity: 0, duration: 0.5, ease: 'power2.in' })
    }
  }, [aboveBarOpen])


  return (
    <div className='w-full h-screen russo-one-regular  bg-neutral-950 px-5 subpixel-antialiased'  >
      <div className='main w-full relative text-white rel flex flex-col justify-between items-center h-full p-5 '>

        <div ref={abovePanelRef}  //Responsible for The above bar
          className='w-full bg-neutral-900 z-10 absolute'
        ></div>

        <div className="navbar w-full h-[5rem] flex relative flex-row justify-between items-center ">
          <span className=''><p className='font-bold text-2xl text-red-500/90'>Vanish</p></span>
          <span className='absolute translate-x-213 z-20' onClick={() => abovePanelHandler()}><p className='text-3xl'>{aboveBarOpen ? "Close" : "Menu"}</p></span>
          <span><p className='text-2xl'>Login/Signup</p></span>
        </div>
        <div className="navbar w-full h-[5rem] flex flex-row justify-between items-center " >
          <span><p className='text-2xl'>@naazmanhas</p></span>
          <span className='text-center' >
            <MouseParallax shouldResetPosition={true} parallaxContainerRef={firstContainerRef}>
              <span>
                <p className='text-5xl glow-text'>Your Privacy</p>
                <p className='text-8xl glow-text'>Matters</p>
              </span>
            </MouseParallax>
          </span>
          <span><p className='text-2xl'>@adityaaishwarya</p></span>
        </div>
        <BottomTextFunction />
      </div>
    </div>
  )
}



import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
export const BottomTextFunction = () => {

  const bottomTextRef = useRef(null)
  const bottomTextAnimation = () => {
    gsap.registerPlugin(SplitText)
    if (!bottomTextRef.current) return;
    const element = bottomTextRef.current
    document.fonts.ready.then(() => {
      const split = SplitText.create(element, { type: "chars" })
      gsap.fromTo(split.chars, {
        y: 200,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power1.inOut'
      })
    })
  }

  useEffect(() => {
    bottomTextAnimation()
  }, [])
  return (
    <div className="mainText overflow-x-hidden overflow-y-hidden w-full h-[30%] flex justify-center items-center text-center" >
      <span className='text-[300px] permanent-marker-regular text-center w-full text-white/70'><p ref={bottomTextRef} className='transform scale-x-160 text-red-500/90'>VANISH</p></span>
    </div>

  )
}


export default MainScreen