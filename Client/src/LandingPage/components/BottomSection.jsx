import React from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import SplitText from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger , SplitText)
function BottomSection() {
    const textRef = useRef(null)
    const parentRef= useRef()
    
    
   
    useEffect(()=>{

        if(!textRef.current || !parentRef.current) return;
        const element = textRef.current;
        const split = SplitText.create(element,{type:"words"})

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:parentRef.current,
                start:"top top",
                end:"+=1300",
                scrub:true
            }
        })

        tl.fromTo(split.words , {opacity:0.1,},{opacity:1,duration:2,stagger:0.05})

        return ()=>{
            if(tl.scrollTrigger) tl.scrollTrigger.kill()
                tl.kill()
        }
    },[])
    return (
        <>
        
        <div className='w-full h-[100vh] sticky top-10 ' ref={parentRef}>
            <div className='w-full h-[80%] flex items-center justify-center russo-one-regular'>
                <div className="w-[50%] h-[60%]  flex flex-col gap-10 justify-center items-center">
                <span><p className='glow-text text-8xl'>Our Vision</p></span>
                <span className='text-5xl text-red-600 h-[60%] text-center shadow-[0px_0px_50px_5px_black] '>
                    <p ref={textRef}>
                        To create a world where conversations are sacred and trust is absolute. 
                        A real-time chat app that stands as a fortress against intrusion, a sanctuary of consistent unbroken privacy. Here, your words are yours alone—forever.
                    </p>
                </span> 
                </div>
               
            </div>
        </div>
        </>
    )
}

export default BottomSection    