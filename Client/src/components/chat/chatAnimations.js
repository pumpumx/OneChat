import gsap from 'gsap'

const rotatePlus = (rotateRef)=>{
    if(!rotateRef.current) return;

    const element = rotateRef.current;
    console.log("rotateplus")
    gsap.fromTo(element,{
        rotate:0
    },{
        rotate:315,
        ease:'power3.inOut',
        duration:0.3,
    })
}
const rotateCross = (rotateRef)=>{
    if(!rotateRef.current) return;
    console.log("rotatecross")

    const element = rotateRef.current;

    gsap.fromTo(element,{
        rotate:0
    },{
        rotate:-270,
        ease:'power3.inOut',
        duration:0.3,
    })
}

export{
    rotatePlus,
    rotateCross
}