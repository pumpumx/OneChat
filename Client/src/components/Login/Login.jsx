import React from 'react'
import LoginForm from './loginComponents/LoginForm'
import { useAtomValue } from 'jotai'
import { userAtom } from '../../atoms/atom.js'
import { ToastContainer } from 'react-toastify'
function Login() {
  const loginAtomVal = useAtomValue(userAtom)  
  console.log("loginAtom" , loginAtomVal)
  return (
    <>
         <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
        <div className='w-full bg-black russo-one-regular text-white flex items-center h-screen p-10 space-x-1'>
        <div className='absolute top-4'>
        </div>
        <div className='lg:w-[30%] mx-auto h-[50%]
        sm:w-[70%]
        '>
            <LoginForm />
        </div>
    </div>
    </>
  )
}

export default Login