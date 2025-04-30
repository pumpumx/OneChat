import React from 'react'
import RegisterForm from './components/RegisterForm'
function Register() {
  return ( 
    <>
    <div className='w-full h-screen flex items-center justify-around bg-black px-50 py-10 '>
        <div className="image flex flex-col p-4 w-[50%] h-[80%] ">
              <div className='w-[85%] h-[60%] flex justify-center flex-col  '>
                  <h1 className='text-[#ffffff]   text-5xl '>
                    Chat Seamlessly <br />
                  </h1>
                  <p className='text-[#dbd6d6] mt-5'>
                    Ease out the complexity of <br></br>chatting Online
                    Sign up now to avail
                  </p>
                
              </div>
              <div className='ImageSection w-[75%] h-[50%]  '>
                    <img src="/public/images/login/register_section.jpg" alt="Image" 
                    className='bg-contain w-full h-full'
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