import React from 'react'
import {createPortal} from 'react-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '../registerComponents/InputField'
import Spinner from '../../Utils/Spinner'
import Register from '../Register'
import { useSetAtom } from 'jotai'
import { authMethod } from '../../../auth_api/user.auth.js'
import { useNavigate } from 'react-router-dom'
import { setUserToLocalStorage } from '../../../auth_api/localStorage.user.js'
import { loginAtom } from '../../../atoms/atom.js'
import { toast } from 'react-toastify'
function LoginForm() {
    
    const setLoginAtom = useSetAtom(loginAtom)

    const navigate = useNavigate()
    const loginSchema = yup.object().shape({
        username: yup.string().required('Username is required').trim(),
        password: yup.string().required('Password is required').min(6, 'Min pass length is 6'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(loginSchema)
    })


    const onSubmit = async (data) => {  
        try {
            const response = await authMethod.loginUser(data)
            
            if (response && response.status == 200) {
                setLoginAtom(response.data.message)
                setUserToLocalStorage(response.data) 
                toast.success("Login Successfull")
                setTimeout(()=>{
                        navigate('/app')
                },1000)
            }
            else{
                setLoginAtom(null)
            }
        } catch (error) {
            console.log("Error occured at Login user", error)
        }
    }
    return (

        <div className='w-[90%] h-full bg-white/40 p-10  rounded-xl'>  
            <h1 className='text-4xl h-[10%] a'>Sign in</h1>

            <form onSubmit={handleSubmit(onSubmit)}
                className='w-full h-full flex flex-col gap-2
                p-6
                justify-around  items-center '
            >
                <div className='w-full h-[60%] flex flex-col  justify-around' >
                    < InputField label="Username" name="username" error={errors.username} register={register} className='text-black'/>
                    < InputField label="Password" type='password' name="password" error={errors.password} register={register} className='text-black'/>
                </div>


                {isSubmitting ? createPortal(
                        <Spinner />,document.body
                    ) : <p></p>}  

                <button type="submit"
                    className='lg:w-[25%] sm:[60%] h-[10%] hover:cursor-pointer bg-[#beadad] hover:bg-black transition-all ease-in rounded-xl 
                    self-center  '
                >
                 Sign In  
                </button>

                    <p className='text-sm font-semibold hover:text-green-400 text-white cursor-pointer'>Forgot Your Password?</p>
            </form>
        </div>
    )
}

export default LoginForm