import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function VanishSpinner() {
  const charsRef = useRef([]);
  const dotRef = useRef(null);

  useEffect(() => {
    // Animate chars with fade-in and float
    setTimeout(()=>"",3000)
    clearTimeout(setTimeout)
    gsap.from(charsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)",
      repeat: -1,
      yoyo: true,
    });

    // Orbit animation for the dot on the "i"
    gsap.to(dotRef.current, {
      duration: 2,
      repeat: -1,
      ease: "linear",
      motionPath: {
        path: "M 0 0 a 0.5em 0.5em 0 1 1 1 0 a 0.5em 0.5em 0 1 1 -1 0",
        alignOrigin: [0.5, 0.5],
      },
    });
  }, []);

  const text = "vanish".split("");

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-4xl font-bold text-white relative">
        {text.map((char, i) => {
          if (char === "i") {
            return (
              <span
                key={i}
                className="relative inline-block mx-[0.05em]"
                ref={(el) => (charsRef.current[i] = el)}
              >
                i
                <span
                  ref={dotRef}
                  className="absolute w-2 h-2 bg-black rounded-full left-1/2 -top-2 transform -translate-x-1/2"
                ></span>
              </span>
            );
          }
          return (
            <span
              key={i}
              ref={(el) => (charsRef.current[i] = el)}
              className="inline-block mx-[0.05em]"
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
