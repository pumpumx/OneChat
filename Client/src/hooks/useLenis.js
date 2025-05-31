import { useEffect } from "react";
import Lenis from "lenis";

const useLenis = ()=>{
    useEffect(()=>{
        const lenis = new Lenis({
            smooth:true,
            lerp:0.09,
        })

        function raf(time){
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)


        return ()=>{
            lenis.destroy()
        }
    },[])
}

export default useLenis