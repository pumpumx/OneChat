import React, { useRef, useEffect } from "react";
import { MouseParallax } from "react-just-parallax";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function CenterScreen() {
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);
  const parentRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (!firstDivRef.current || !secondDivRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top center",
        end: "+=500",
        scrub: true,
      },
    });

    tl.fromTo(
      firstDivRef.current,
      {
        x: "-100%",
        opacity: 0,
      },
      {
        x: 0,
        duration: 2,
        ease: "power1.out",
        opacity: 1,
      },
      0
    );
    tl.fromTo(
      secondDivRef.current,
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: 0,
        duration: 2,
        ease: "power1.out",
        opacity: 1,
      },
      0
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div    
      ref={parentRef}
      className="w-full h-full flex items-center justify-center overflow-x-hidden"
    >
      <div className="mainLayer w-full max-w-7xl flex flex-col md:flex-row justify-center md:justify-around items-center gap-8 md:gap-0 px-4 md:px-0">
        {/* First Card */}
        <div className="card w-full md:w-[45%] h-auto md:h-[90%] bg-okay flex items-center justify-center">
          <div
            className="w-full md:w-[90%] h-full border border-white/50 rounded-lg flex flex-col items-center"
            ref={firstDivRef}
          >
            <div className="w-[70%] rounded-md h-52 md:h-[60%] mt-6 md:mt-10">
              <MouseParallax
                shouldResetPosition={true}
                parallaxContainerRef={firstDivRef}
              >
                <img
                  src="/toji.gif"
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
              </MouseParallax>
            </div>
            <div className="w-[70%] h-auto mt-2 text-center">
              <p className="text-xl md:text-3xl text-white russo-one-regular">
                @naazmanhas
              </p>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div
          className="card w-full md:w-[45%] h-auto md:h-[90%] bg-okay flex justify-center items-center"
          ref={secondDivRef}
        >
          <div className="w-full md:w-[90%] h-full flex flex-col justify-around items-start text-white russo-one-regular gap-4 md:gap-8 p-4 md:p-0">
            <div>
              <p className="font-bold text-2xl md:text-4xl">
                Why did we build this?
              </p>
              <p className="text-white/50 text-xl md:text-3xl inline">
                *clears throat*
              </p>
            </div>
            <p className="text-sm md:text-base text-left">
              We believe in trash talk without the fear of your late-night
              confessions ending up in government archives… or as memes in your
              group chat. Say whatever you want — we’re not here to judge, and
              neither is Big Brother.
            </p>
            <div className="text-lg md:text-2xl text-left">
              <p className="glow-text">Vanish</p>
              <p>
                where your words self-destruct faster than your moral compass at
                3am.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterScreen;
