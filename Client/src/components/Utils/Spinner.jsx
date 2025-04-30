import React from 'react'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
