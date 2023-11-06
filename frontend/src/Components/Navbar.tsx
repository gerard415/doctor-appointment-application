import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' flex justify-between items-center w-full '>
        <div>
            Medicare
        </div>
        <div className='space-x-7 text-[13px] hidden md:inline'>
          <Link to={'/'}>Home</Link>
          <Link to={'/services'}>Services</Link>
          <Link to={'/doctors'}>Find a Doctor</Link>
          <Link to={'/contact'}>Contact</Link>
        </div>
        <div className='space-x-4 text-[13px] hidden md:flex'>
          <button className='bg-blue-600 h-[30px] w-[85px] rounded-2xl text-white '>Log in</button>
          <button>Sign up</button>
        </div>
        <button className='md:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    </div>
  )
}

export default Navbar