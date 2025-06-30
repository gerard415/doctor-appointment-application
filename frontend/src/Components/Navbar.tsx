import {useState, useContext, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { UserProps } from '../types'

const Navbar = () => {
  const { user }: UserProps = useContext(UserContext)

  const fullName = user?.name?.split(' ') 

  const [showMenu, setShowMenu] = useState(false)

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false)
  }, [location]);

  return (
    <div className='w-full pt-2 sm:pt-3'>
      <div className=' flex justify-between items-center w-full '>
        <Link to={'/'} className='text-[13px] phone:text-[16px]'>
            HealthHub
        </Link>
        <div className='space-x-7 text-[11px] md:text-[13px] hidden sm:inline'>
          <Link to={'/'}>Home</Link>
          <Link to={'/services'}>Services</Link>
          <Link to={'/doctors'}>Find a Doctor</Link>
          <Link to={'/contact'}>Contact</Link>
        </div>
        {user ?
          <div className='flex items-center gap-2 border border-gray-300 rounded-full sm:py-1 sm:px-3 py-1 px-3 mt-1 '>
              <Link to={'/profile'} className='flex items-center gap-1 '>
                <p className='sm:text-[13px] text-[11px] font-bold'>{!fullName ? '' : fullName[0]}</p>
                {user.photo ? 
                  <img src={user.photo}  alt="" className='rounded-full sm:w-6 w-5 sm:h-6 h-5 relative ' /> :  
                
                  <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="sm:w-5 sm:h-5 h-4 relative top-1">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                }
              </Link>
              
              <button className='sm:hidden' onClick={() => setShowMenu(!showMenu)}>
                {!showMenu ? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                } 
              </button>
              
          </div>
        : <div className='flex'>
            <div className='space-x-2 galaxyfold:text-[11px] sm:text-[13px] hidden sm:flex'>
              <Link to={'/login'} className='bg-blue-600 sm:h-[30px] sm:w-[85px] galaxyfold:w-[65px] galaxyfold:h-[23px]  rounded-2xl text-white flex justify-center items-center '>Log in</Link>
              <Link to={'/register'} className='flex justify-center items-center '>Sign up</Link>
            </div>
            <button className='sm:hidden' onClick={() => setShowMenu(!showMenu)}>
              {!showMenu ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
               : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>}
      </div>
      {showMenu && 
        <div className='w-full h-[180px] border-b border-gray-200 text-center text-[11px] phone:text-[13px] flex flex-col justify-between p-2 pt-3'>
          <Link to={'/'}>Home</Link>
          <Link to={'/services'}>Services</Link>
          <Link to={'/doctors'}>Find a Doctor</Link>
          <Link to={'/contact'}>Contact</Link>
          {user && <Link to={'/profile'} className='mt-2 font-semibold'>Profile</Link>}
          {!user &&
            <div className='flex flex-col space-y-2'>
              <Link to={'/login'} className='mt-2 font-semibold'>Login</Link>
              <Link to={'/register'} className='mt-2 font-semibold'>Register</Link>
            </div>
          }
        </div>
      }
      
    </div>
    
  )
}

export default Navbar