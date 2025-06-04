import React from 'react'
import { useAtomValue } from 'jotai'
import RegisterForm from './registerComponents/RegisterForm'
import { userAtom} from '../../atoms/atom.js'
function Register() {
  const registerAtomVal = useAtomValue(userAtom)
  console.log("register: ",registerAtomVal)
  return (
    <>
      <div className='w-full h-auto md:h-screen flex md:flex-row flex-col items-center justify-around bg-black  '>
        <div className="image flex flex-col  p-4 w-[100%]  mx-auto items-center justify-center  h-[80%] lg:w-[50%] lg:h-[80%] ">
          <div className='w-[85%] h-[30%] flex jusitfy-around md:justify-center 2xl:pl-50 flex-col  '>
            <h1 className='text-[#ffffff]  russo-one-regular text-7xl '>
              Chat <br /> Seamlessly <br />
            </h1> 
            <p className='text-[#dbd6d6] mt-5 font-semibold'>
            Simplify your online conversations with our intuitive chat platform. <br />Sign up now to connect effortlessly.
            </p>
          </div>
          <div className="w-full mt-10 max-w-xl h-100 sm:h-100 lg:h-96 overflow-hidden rounded-xl shadow-[20px_px_500px_1px_white]">
            <video
              autoPlay
              loop
              muted
              src="/images/login/register.mp4"
              className="w-full h-full object-cover "
            />
          </div>
        </div>

        <div className="formRegister md:w-[100%] w-[90%] h-[50%] lg:w-[50%]  lg:h-[80%] lg:mt-30">
          <RegisterForm />
        </div>
      </div>
    </>
  )
}

export default Register