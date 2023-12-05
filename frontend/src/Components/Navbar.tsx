import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { UserProps } from '../types'

const Navbar = () => {
  const { user }: UserProps = useContext(UserContext)

  const fullName = user?.name?.split(' ') 

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
        {user ?
          
          <Link to={'/profile'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
              <p className='text-[13px] font-bold'>{!fullName ? '' : fullName[0]}</p>
              <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </Link>
        : <div>
            <div className='space-x-4 text-[13px] hidden md:flex'>
              <Link to={'/login'} className='bg-blue-600 h-[30px] w-[85px] rounded-2xl text-white flex justify-center items-center '>Log in</Link>
              <Link to={'/register'} className='flex justify-center items-center'>Sign up</Link>
            </div>
            <button className='md:hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
          </div>}
        
    </div>
  )
}

export default Navbar