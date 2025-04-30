import React from 'react'
import { useAtomValue } from 'jotai'
import RegisterForm from './registerComponents/RegisterForm'
import { userAtom} from '../../atoms/atom.js'
import Notify from '../Utils/Notify.jsx'
function Register() {
  const registerAtomVal = useAtomValue(userAtom)
  console.log("register: ",registerAtomVal)
  return (
    <>
      {registerAtomVal.status==200 && <Notify label={true} message={`${registerAtomVal.data}`} />}
      <div className='w-full h-screen flex items-center justify-around bg-black px-50 py-10 '>
        <div className='absolute  '>

        </div>
        <div className="image flex flex-col p-4 w-[50%] h-[80%] ">
          <div className='w-[85%] h-[30%] flex justify-center flex-col  '>
            <h1 className='text-[#ffffff]   text-5xl '>
              Chat <br /> Seamlessly <br />
            </h1>
            <p className='text-[#dbd6d6] mt-5'>
              Ease out the complexity of <br></br>chatting Online 
              Sign up now 
            </p>

          </div>
          <div className='ImageSection w-[75%] h-[70%] bg-red-400  overflow-hidden '>
            <video autoPlay loop src="/images/login/register.mp4"
              className='bg-cover'
            />
          </div>
        </div>

        <div className="formRegister w-[50%] h-[80%]">
          <RegisterForm />
        </div>
      </div>
    </>
  )
}

export default Register