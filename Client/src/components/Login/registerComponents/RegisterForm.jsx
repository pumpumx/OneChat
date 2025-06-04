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
            console.log("data: ", data)
            const response = await authMethod.registerUser(data)
            if (response && response.status == 200) {
                setRegisterAtom(response.data)
                setTimeout(() => {
                    navigate('/app')
                }, 1000)
            }
            else {
                setRegisterAtom({})
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
                className="flex flex-col space-y-6 lg:space-y-3 text-white russo-one-regular"
            >
                {/* Name Fields || COULD HAD made these commponents */}
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-0 md:space-y-0"> 
                    <InputField
                        label="First Name"
                        name="firstName"
                        error={errors.firstName}
                        register={register}
                        className="w-full"
                    />
                    <InputField
                        label="Last Name"
                        name="lastName"
                        error={errors.lastName}
                        register={register}
                        className="w-full"
                    />
                </div>

                {/* Other Fields */}
                <InputField
                    label="Username"
                    name="username"
                    error={errors.username}
                    register={register}
                />
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    error={errors.email}
                    register={register}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    error={errors.password}
                    register={register}
                />

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full md:w-1/3 mx-auto h-12 bg-[#beadad] hover:bg-green-500 transition-all duration-200 text-white font-semibold rounded-xl flex items-center justify-center"
                    >
                        {isSubmitting ? <Spinner /> : "Sign Up"}
                    </button>

                </div>



            </form>
        </div>

    )
}

export default RegisterForm