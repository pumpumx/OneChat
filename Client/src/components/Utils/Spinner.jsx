import { useEffect } from "react";
import gsap from "gsap";

export default function Spinner() {
  const text = "Loading...";

  useEffect(() => {
    // Animate each letter
    gsap.to(".loading-letter", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });

    // Pulse the dot
    gsap.to(".pulse-dot", {
      scale: 1.4,
      opacity: 0.3,
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      ease: "sine.inOut",
    });



  }, []);

  return (
    <div className="fixed z-50 h-screen w-full bg-black text-white flex flex-col items-center justify-center">
      <div className="flex space-x-1 text-3xl font-semibold">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="loading-letter"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              display: "inline-block",
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="pulse-dot mt-6 w-3 h-3 bg-white rounded-full"></div>
    </div>
  );
}
