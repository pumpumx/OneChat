import React from 'react'

function Footer() {
  return (
    <div className='w-full h-full russo-one-regular '>
    <footer className=" p-8 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-white">About Us</h3>
          <p>We provide awesome web development services to help your business grow and succeed online.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
          <p>Email: JoemamaCrying@gmail.com</p>
          <p>Phone: +91 69696969696</p>
          <p>Address: Albequerque drug lab</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>© 2025 My Website. All rights reserved.</p>
      </div>
    </footer>
        </div>
  )
}

export default Footer