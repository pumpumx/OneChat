import React from 'react'

function Button({classname=""  ,value="Enter Button Name" , color="black"}) {
  return (
    <div className='p-2 mb-3 rounded-3xl'>
        <button className={`w-[var(--button-width)] h-[var(--button-height)] bg-[${color}] ${classname} `}
        >
            {value}
        </button>
    </div>
  )
}

export default Button