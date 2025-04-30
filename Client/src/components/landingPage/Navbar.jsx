import React from 'react'

function Navbar() {
  return (
    <nav className='w-full h-[var(--header-height)] bg-[var(--color-primary)]
            flex justify-around '>
                <div className="logo">
                    <img src="" alt="" />
                </div>

                <div>
                    <ul>
                        <li>App</li>
                        <li>Features</li>
                        <li>About</li>
                        <li>Pages</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div>
                    
                </div>
            </nav>
  )
}

export default Navbar