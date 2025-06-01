import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import useLenis from '../../hooks/useLenis.js'
function VideoSection() {
    const textRef = useRef()
    const containerRef = useRef()
    const videoRef = useRef()
    const text2Ref = useRef()
    gsap.registerPlugin(ScrollTrigger)

    useLenis()
   
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return

    // Create a timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom bottom', // when the bottom of the sticky container hits bottom of viewport
        end: '+=500', // length of the animation in px (tweak this)
        scrub: true,
      }
    })

    // Animate the text towards center
    tl.to(textRef.current, { x: '190%', opacity: 1, duration: 3 }, 0)
    tl.to(text2Ref.current, { x: '-140%', opacity: 1, duration: 3 }, 0)

    // Scale up the video to fill the screen
    tl.to(videoRef.current, { scale: 2, duration: 2, ease:'power2.in' }, 0)

    // Clean up
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])    

  return (
    <div className='w-full h-[100vh] sticky top-0 ' ref={containerRef}>
    <div className='w-full h-full flex  items-center justify-center z-10 '>
      <div className='w-[30%] h-[50%] russo-one-regular flex justify-end items-center'>
        <span className='z-10' ><p className='text-7xl  glow-text mr-5 z-50' ref={textRef}>Chat</p></span>
      </div>
      <div className='w-[40%] h-[90%] flex items-center justify-center z-0'>
        <video muted autoPlay={true} loop preload='auto' playsInline className='w-[100%] h-full' ref={videoRef}>
          <source src='/suku.mp4' />
        </video>
      </div>
      <div className='w-[30%] h-[50%] flex justify-start items-center z-10 ' >
        <span className='z-10'><p className='text-7xl russo-one-regular ml-5  glow-text z-50' ref={text2Ref}>Privately</p></span>
      </div>
    </div>
  </div>
  )
}

export default VideoSection