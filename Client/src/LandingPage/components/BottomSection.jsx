import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

function BottomSection() {
  const textRef = useRef(null)
  const parentRef = useRef()

  useEffect(() => {
    if (!textRef.current || !parentRef.current) return

    const element = textRef.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: 'top center',
        end: '+=1300',
        scrub: true,
      },
    })

    document.fonts.ready.then(() => {
      const split = SplitText.create(element, { type: 'words' })
      tl.fromTo(
        split.words,
        { opacity: 0.1 },
        { opacity: 1, duration: 2, stagger: 0.05 }
      )
    })

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={parentRef}
      className="w-full min-h-screen sticky top-10 flex items-center justify-center"
    >
      <div className="max-w-5xl w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-8 md:gap-10 justify-center items-center text-center p-4 md:p-0">
        <span>
          <p className="glow-text text-4xl md:text-6xl lg:text-8xl russo-one-regular font-bold">
            Our Vision
          </p>
        </span>
        <span className="text-xl md:text-3xl lg:text-4xl russo-one-regular text-red-600 shadow-[0px_0px_50px_5px_black]">
          <p ref={textRef}>
            To create a world where conversations are sacred and trust is
            absolute. A real-time chat app that stands as a fortress against
            intrusion, a sanctuary of consistent unbroken privacy. Here, your
            words are yours alone—forever.
          </p>
        </span>
      </div>
    </div>
  )
}

export default BottomSection
