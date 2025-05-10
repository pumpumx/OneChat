import React from 'react'
import LoginForm from './loginComponents/LoginForm'
import { useAtomValue } from 'jotai'
import { userAtom } from '../../atoms/atom.js'
import Notify from '../Utils/Notify.jsx'
function Login() {
  const loginAtomVal = useAtomValue(userAtom)  
  console.log("loginAtom" , loginAtomVal)
  return (
    <>
        
        <div className='w-full bg-black flex items-center h-screen p-10 space-x-1'>
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