import React from 'react'
import {createPortal} from 'react-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '../registerComponents/InputField'
import Spinner from '../../Utils/Spinner'
import Register from '../Register'
import { useSetAtom } from 'jotai'
import { authMethod } from '../../../auth/user.auth.js'
import { useNavigate } from 'react-router-dom'
import { setUserToLocalStorage } from '../../../auth/localStorage.user.js'
import Notify from '../../Utils/Notify.jsx'
import { loginAtom } from '../../../atoms/atom.js'
function LoginForm() {
    
    const setLoginAtom = useSetAtom(loginAtom)

    const navigate = useNavigate()
    const loginSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
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
            console.log("res" , response.data)
            if (response && response.status == 200) {
                setLoginAtom(response.data)
                setUserToLocalStorage(response.data) 
                setTimeout(()=>{
                        navigate('/app')
                },1000)
                {createPortal(
                    <Notify message={`${response.data}`}/>
                )}
            }   
            else{
                setLoginAtom(null)
                {createPortal(
                    
                )}
            }
        } catch (error) {
            console.log("Error occured at Login user", error)
        }
    }
    return (

        <div className='w-[90%] h-full bg-white p-10  rounded-xl'>
            <h1 className='text-4xl h-[10%] a'>Sign in</h1>

            <form onSubmit={handleSubmit(onSubmit)}
                className='w-full h-full flex flex-col gap-2
                p-6
                justify-around  items-center '
            >
                <div className='w-full h-[60%] flex flex-col  justify-around' >
                    < InputField label="Username" name="username" error={errors.username} register={register} />
                    < InputField label="Password" type='password' name="password" error={errors.password} register={register} />
                </div>

                <button type="submit"
                    className='lg:w-[25%] sm:[60%] h-[10%] hover:cursor-grab bg-[#beadad] hover:bg-green-400 rounded-xl 
                   motion-preset-oscillate-sm motion-paused hover:motion-running'
                >
                    {isSubmitting ? <Spinner /> : <p className="">Sign in</p>}  
                </button>
            </form>
        </div>
    )
}

export default LoginForm