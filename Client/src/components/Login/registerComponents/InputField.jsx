import React from 'react'

function InputField({label , name , type="text" , register , error , className="" }) {
  return (
    <div className='space-x-1 '>
        <label htmlFor={label}
        className='font-medium text-lg  '
        >
          {label}
        </label>
        <input
        type={type}
        className={`h-[3rem] w-[100%] ${className} rounded-sm indent-1 outline-none border-none  bg-gray-200`}
        {...register(name)}
        />
        {error && <p className='text-md text-red-500'>{error.message}</p>}
    </div>
  )
}

export default InputField