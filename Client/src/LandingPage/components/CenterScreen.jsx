import React, { useRef } from 'react'
import { MouseParallax } from 'react-just-parallax'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
function CenterScreen() {
    const firstDivRef = useRef(null)
    const secondDivRef = useRef(null)
    const parentRef = useRef(null)
    gsap.registerPlugin(ScrollTrigger)

    useEffect(()=>{

        if(!firstDivRef.current && secondDivRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:parentRef.current,
                start:'top center',
                end:"+=500",
                scrub:true
            }  
            })

            tl.fromTo(firstDivRef.current , {x:"-100%",rotateY:"200",rotateX:"-300",rotateZ:"-100",opacity:0},{x:0 , duration:2 ,rotateY:0, rotateZ:0,rotateX:0, ease:'power1.out' , opacity:1},0)
            tl.fromTo(secondDivRef.current , {x:"100%",rotateY:"200",rotateX:"300",rotateZ:"-100",opacity:0},{x:0 , duration:2 , rotateY:0,rotateZ:0,rotateX:0,ease:'power1.out' , opacity:1},0)

            return ()=>{
               if(tl.scrollTrigger) tl.scrollTrigger.kill()
                tl.kill()
            }
        },[])
       

    return (
        <>
            <div className='w-full h-full flex items-center justify-center overflow-x-hidden' ref={parentRef} >
                <div className="mainLayer w-[70%] h-[70%]  flex justify-around items-center">
                    <div className="card w-[40%] h-[90%] bg-okay  flex items-center justify-center ">
                        <div className='w-[90%] h-full border-1 border-white/50  rounded-lg flex flex-col items-center ' ref={firstDivRef}>
                            
                                <div className='w-[70%] rounded-md h-[60%] mt-10 '>
                                <MouseParallax shouldResetPosition={true} parallaxContainerRef={firstDivRef} >
                                    <img src="/toji.gif" alt="" className='w-full bg-contain h-full rounded-lg ' />
                                    </MouseParallax>
                                </div>
                           
                            <div className='w-[70%] h-[20%] mt-2'>
                                <span><p className='text-3xl text-white russo-one-regular'>@naazmanhas</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="card w-[40%] h-[90%]  bg-okay  flex justify-center items-center" ref={secondDivRef}>
                        <div className='w-[90%] h-[70%]  flex flex-col justify-around items-start  text-white russo-one-regular'>
                            <span><p className='font-bold text-4xl '>Why did we build this?</p><span><p className='text-white/50 inline text-3xl'>*clears throat*</p></span></span>
                            <span className='text-left'><p>We believe in trash talk without the fear of your late-night confessions ending up in government archives… or as memes in your group chat. Say 
                                whatever you want — we’re not here to judge, and neither is Big Brother.  </p></span>
                            <span className='text-3xl text-left'><span><p className='glow-text'>Vanish</p></span><p> where your words self-destruct faster than your moral compass at 3am.</p></span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CenterScreen