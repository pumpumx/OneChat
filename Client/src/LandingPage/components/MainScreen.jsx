import React, { useEffect, useRef, useState } from "react";
import { MouseParallax } from "react-just-parallax";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

function MainScreen() {
  const firstContainerRef = useRef(null);
  const [aboveBarOpen, setAboveBarOpen] = useState(false);
  const abovePanelRef = useRef(null);
  const navigate = useNavigate();

  const abovePanelHandler = () => {
    setAboveBarOpen(!aboveBarOpen);
  };

  useEffect(() => {
    const element = abovePanelRef.current;

    if (aboveBarOpen) {
      gsap.to(element, {
        height: "50vh", // use viewport height for responsiveness
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      });
    }
  }, [aboveBarOpen]);

  return (
    <div className="w-full min-h-screen  russo-one-regular subpixel-antialiased z-20">
      <div className="main w-full relative text-white flex flex-col justify-between items-center h-full p-4 md:p-8">
        {/* Above Panel */}
        <div
          ref={abovePanelRef}
          className={`w-full bg-neutral-900 z-10 absolute top-0 left-0 p-4 md:p-8 overflow-hidden`}
        >
          <div className=" w-full h-full lg:flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Video Section */}
            <div className=" videoSection w-full md:w-1/2 h-48 md:h-[70%] flex justify-center items-center">
              <div className="videoBox w-3/5 h-full">
                <video
                  preload="auto"
                  className="w-0 h-0 lg:w-full lg:h-full object-cover rounded-lg"
                  muted
                  loop
                  autoPlay
                >
                  <source src="/mahoraga.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Text Section */}
            <div className="text-section w-full md:w-1/2 h-48 md:h-[70%] flex justify-center items-center">
              <div className="links w-3/5 h-full flex flex-col items-center justify-center space-y-4 md:space-y-6">
                <p className="text-4xl md:text-6xl text-red-500 cursor-pointer hover:text-red-600 transition">
                  Home
                </p>
                <p className="text-4xl md:text-6xl text-red-500 cursor-pointer hover:text-red-600 transition">
                  About
                </p>
                <p className="text-4xl md:text-6xl text-red-500 cursor-pointer hover:text-red-600 transition">
                  Contact
                </p>
              </div>
            </div>

            {/* Bottom Social Bar */}
            <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-neutral-800 border-t border-white/80 flex justify-between items-center px-4 md:px-12 text-white text-sm md:text-base">
              <a
                href="https://www.instagram.com/naazmanhas?igsh=anQ3eTBxZzQ3bjh1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/3 text-center border-r border-white/80"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/naazmanhas/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-2/5 text-center border-r border-white/80"
              >
                LinkedIn
              </a>
              <span className="w-1/3 text-center flex justify-center items-center gap-2">
                Mail
                <span className="h-6 w-px bg-white"></span>
              </span>
            </div>
          </div>
        </div>

        {/* Top Navbar */}
        <div className="navbar w-full h-16 md:h-20 flex relative justify-between items-center px-4 md:px-12">
          <span className="z-20">
            <p className="font-bold text-2xl md:text-4xl text-red-500/90">Vanish</p>
          </span>
          <span
            className="z-20 cursor-pointer text-lg md:text-3xl md:right-12 transform translate-x-1/2 md:translate-x-0"
            onClick={()=>abovePanelHandler()}
          >
            {aboveBarOpen ? "Close" : "Menu"}
          </span>
          <span className="z-20 flex space-x-2 cursor-pointer text-sm md:text-2xl">
            <p onClick={() => navigate("/login")}>Login/</p>
            <p onClick={() => navigate("/register")}>Signup</p>
          </span>
        </div>

        {/* Middle Section */}
        <div className="navbar w-full h-40 md:h-56 md:mt-50 flex flex-row justify-between items-center px-4 md:px-12">
          <span className="text-sm md:text-2xl">@naazmanhas</span>

          <span className="text-center" ref={firstContainerRef}>
            <MouseParallax shouldResetPosition={true} parallaxContainerRef={firstContainerRef}>
              <span>
                <p className="text-3xl md:text-5xl glow-text">Your Privacy</p>
                <p className="text-5xl md:text-8xl glow-text">Matters</p>
              </span>
            </MouseParallax>
          </span>

          <span className="text-sm md:text-2xl text-right">
            Inspired by <br />@ranlus.studio
          </span>
        </div>

        {/* Bottom Text */}
        <div className="bottom-0 w-full md:mt-30">
        <BottomTextFunction />
        </div>
        
      </div>
    </div>
  );
}

// BottomTextFunction Component

export const BottomTextFunction = () => {
  const bottomTextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    if (!bottomTextRef.current) return;
    const element = bottomTextRef.current;
    document.fonts.ready.then(() => {
      const split = SplitText.create(element, { type: "chars" });
      gsap.fromTo(
        split.chars,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power1.inOut",
        }
      );
    });
  }, []);

  return (
    <div className="mainText z-20 md:text-2xl  overflow-hidden bottom-0 w-full h-1/3  flex justify-center items-center text-center px-4">
      <p
        ref={bottomTextRef}
        className="permanent-marker-regular text-red-500/90 whitespace-nowrap"
        style={{ fontSize: "clamp(5rem, 20vw, 18rem)", transform: "scaleX(1.6)" }}
      >
        VANISH
      </p>
    </div>
  );
};

export default MainScreen;
