import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from './InputField'
import { authMethod } from '../../../auth_api/user.auth.js'
import { useSetAtom } from 'jotai'
import { userAtom } from '../../../atoms/atom.js'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
function RegisterForm() {

    const navigate = useNavigate()
    const setRegisterAtom = useSetAtom(userAtom)

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
            const response = await authMethod.registerUser(data)
            if (response && response.status == 200) {
                setRegisterAtom(response.data)
                setTimeout(() => {
                    navigate('/app')
                }, 1000)
                toast.success("Registration successfull")
            }
            else {
                setRegisterAtom({})
                toast.error("Registration failed")
            }
        } catch (error) {
            console.warn("Error occured at register user", error)
        }
    }
    return (
        <div className="md:w-[90%] lg:w-[60%]  h-auto  max-w-3xl mx-auto bg-white/40 lg:p-15 p-10 rounded-2xl shadow-md">
            <h1 className="text-4xl font-bold text-center mb-8 text-white russo-one-regular">Sign Up Now</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-6 lg:space-y-3  text-white russo-one-regular"
            >
                {/* Name Fields || COULD HAD made these commponents */}
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-0 md:space-y-0"> 
                    <InputField
                        label="First Name"
                        name="firstName"
                        error={errors.firstName}
                        register={register}
                        className="w-full text-black"
                    />
                    <InputField
                        label="Last Name"
                        name="lastName"
                        error={errors.lastName}
                        register={register}
                        className="w-full text-black"
                    />
                </div>

                {/* Other Fields */}
                <InputField
                    label="Username"
                    name="username"
                    error={errors.username}
                    register={register}
                    className='text-black'
                />
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    error={errors.email}
                    register={register}
                    className='text-black'
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    error={errors.password}
                    register={register}
                    className='text-black'
                />

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full md:w-1/3 mx-auto h-12 bg-[#beadad] hover:bg-green-500 transition-all duration-200 text-white font-semibold rounded-xl flex items-center justify-center"
                    >
                        {isSubmitting ? "Signing you up" : "Sign Up"}
                    </button>

                </div>



            </form>
        </div>

    )
}

export default RegisterForm