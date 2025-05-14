import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from './InputField'
import Spinner from '../../Utils/Spinner'
import { authMethod } from '../../../auth_api/user.auth.js'
import { useSetAtom } from 'jotai'
import { userAtom } from '../../../atoms/atom.js'
import { useNavigate } from 'react-router-dom'
function RegisterForm() {
    
    const navigate  = useNavigate()
   const setRegisterAtom  = useSetAtom(userAtom)

    const registerSchema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().email('Enter A valid Email').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Min pass length is 6'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = async (data) => {
        try {
            console.log("data: ", data)
            const response = await authMethod.registerUser(data)
            if (response && response.status == 200) {
                setRegisterAtom(response.data)
                setTimeout(() => {
                    navigate('/app')
                } , 1000)
            }
            else{
                setRegisterAtom({})
            }
        } catch (error) {
            console.warn("Error occured at register user", error)
        }
    }
    return (
        <div className='w-[90%] h-full bg-white p-10  rounded-xl'>
            <h1 className='text-4xl h-[10%] a'>Sign up Now</h1>

            <form onSubmit={handleSubmit(onSubmit)}
                className='w-full h-full flex flex-col gap-2
                p-6
                justify-around  items-center '
            >
                <div className='w-full h-[20%] flex gap-3 justify-around '>
                    < InputField label="First Name" name="firstName" error={errors.firstName} register={register} className='w-[30%]' />
                    < InputField label="Last Name" name="lastName" error={errors.lastName} register={register} className='w-[30%]' />
                </div>
                <div className='w-full h-[60%] flex flex-col  justify-around' >
                    < InputField label="Username" name="username" error={errors.username} register={register} />
                    < InputField label="Email" type='email' name="email" error={errors.email} register={register} />
                    < InputField label="Password" type='password' name="password" error={errors.password} register={register} />
                </div>

                <button type="submit"
                    className='w-[25%] h-[10%] hover:cursor-grab bg-[#beadad] hover:bg-green-400 rounded-xl 
                   motion-preset-oscillate-sm motion-paused hover:motion-running'
                >
                    {isSubmitting ? <Spinner /> : <p className="">Sign up</p>}
                </button>
            </form>
        </div>
    )
}

export default RegisterForm