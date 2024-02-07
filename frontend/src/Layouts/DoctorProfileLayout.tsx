import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, NavLink, Navigate } from 'react-router-dom'
import Loading from '../Components/Loading';
import { UserProps } from '../types';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { successfulNotification } from '../notifications';

const DoctorProfileLayout = () => {
    const {ready, user, setUpdateUser}: UserProps = useContext(UserContext)
    const [redirect, setRedirect] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState(true)
    const [completedProfile, setCompletedProfile] = useState(user?.isApproved === 'pending' || 'approved' ? true : false)

    const location = useLocation();

    useEffect(() => {
        setOpenMenu(false)
    }, [location]);

    if(!ready){
        return <Loading/>
    }

    if(ready && !user){
        return <Navigate to={'/login'} />
    }

    if(ready && user && user.role === 'patient'){
        return <Navigate to={'/profile'} />
    }

    const handleLogout = async () => {
        await axios.post('/auth/logout')
        setUpdateUser(prev => !prev)
        setRedirect(true)
        successfulNotification('logout successful')
    }

    const handleDeleteAccount = async () => {
        await axios.delete('/doctor/profile')
        setUpdateUser(prev => !prev)
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
            <div>
                <div className=' galaxyfold:px-7 middle:px-10 lg:px-24 md:flex md:space-x-7 lg:space-x-10  justify-center '>
                    <div className='h-[350px] w-[250px] md:flex flex-col items-center justify-between hidden shadow p-4'>
                        <div className='flex items-center flex-col space-y-2 '>
                            {user?.photo ? 
                                <img src={user.photo}  alt="" className='rounded-full h-[50px] w-[50px] ' /> :
                                
                                <div className='flex justify-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[50px] w-[50px] '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[50px] w-[50px] relative top-1">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            }
                            <p className='font-bold text-[10px] text-center'>{user?.name}</p>
                            <p className='text-[10px] text-center'>{user?.email}</p>
                        </div>
                        <div className='flex items-center flex-col w-full bg-white text-[11px] space-y-2'>
                            <NavLink to={'/doctor-profile'} className={'w-full'}  end>
                                {({ isActive}) => (
                                    <div className={ isActive? ' w-full h-[30px] flex items-center justify-center rounded-[4px] bg-blue-700 bg-opacity-25' : 'w-full h-[30px] flex items-center justify-center rounded-[4px] ' } >
                                        <span className={isActive ? "text-blue-800 font-bold" : "font-bold"}>Overview</span>
                                    </div>
                                )}
                            </NavLink>
                            <NavLink to={'/doctor-profile/appointments'} className={'w-full'}  end>
                                {({ isActive}) => (
                                    <div className={ isActive? ' w-full h-[30px] flex items-center justify-center rounded-[4px] bg-blue-700 bg-opacity-25' : 'w-full h-[30px] flex items-center justify-center rounded-[4px]  ' }>
                                        <span className={isActive ? "text-blue-800 font-bold" : "font-bold"}>Appointments</span>
                                    </div>
                                )}
                            </NavLink>
                            <NavLink to={'/doctor-profile/me'} className={'w-full'}  end>
                                {({ isActive}) => (
                                    <div className={ isActive? ' w-full h-[30px] flex items-center justify-center rounded-[4px] bg-blue-700 bg-opacity-25' : 'w-full h-[30px] flex items-center justify-center rounded-[4px]  ' }>
                                        <span className={isActive ? "text-blue-800 font-bold" : "font-bold"}>Profile</span>
                                    </div>
                                )}
                            </NavLink>
                        </div>
                        <div className='flex flex-col space-y-2 w-full'>
                            <button className='bg-black text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-full ' onClick={() => handleLogout()} >Logout</button>
                            <button className='bg-red-500 text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-full'>Delete Account</button>     
                        </div>
                    </div>
                    <div className='h-full md:hidden w-full items-center space-y-2  mb-10'>
                        <button onClick={() => setOpenMenu(!openMenu)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 sm:h-6 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        {
                            openMenu ? 
                            <div className='space-y-4'>
                                <div className='flex items-center flex-col space-y-2 '>
                                    <div className='flex justify-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[50px] w-[50px] '>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[50px] w-[50px] relative top-1">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className='font-bold text-[10px] text-center'>{user?.name}</p>
                                    <p className='text-[10px] text-center'>{user?.email}</p>
                                </div>
                                <div className='flex items-center flex-col w-full bg-white text-[11px] space-y-2'>
                                    <NavLink to={'/doctor-profile'} className={'w-full'}  end>
                                        {({ isActive}) => (
                                            <div className={ isActive? ' w-full h-[30px] flex items-center justify-center rounded-[4px] bg-blue-700 bg-opacity-25' : 'w-full h-[30px] flex items-center justify-center rounded-[4px] ' } >
                                                <span className={isActive ? "text-blue-800 font-bold" : "font-bold"}>Overview</span>
                                            </div>
                                        )}
                                    </NavLink>
                                    <NavLink to={'/doctor-profile/appointments'} className={'w-full'}  end>
                                        {({ isActive}) => (
                                            <div className={ isActive? ' w-full h-[30px] flex items-center justify-center rounded-[4px] bg-blue-700 bg-opacity-25' : 'w-full h-[30px] flex items-center justify-center rounded-[4px]  ' }>
                                                <span className={isActive ? "text-blue-800 font-bold" : "font-bold"}>Appointments</span>
                                            </div>
                                        )}
                                    </NavLink>
                                    <NavLink to={'/doctor-profile/me'} className={'w-full'}  end>
                                        {({ isActive}) => (
                                            <div className={ isActive? ' w-full h-[30px] flex items-center justify-center rounded-[4px] bg-blue-700 bg-opacity-25' : 'w-full h-[30px] flex items-center justify-center rounded-[4px]  ' }>
                                                <span className={isActive ? "text-blue-800 font-bold" : "font-bold"}>Profile</span>
                                            </div>
                                        )}
                                    </NavLink>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <button className='bg-black text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-full ' onClick={() => handleLogout()} >Logout</button>
                                    <button className='bg-red-500 text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-full' onClick={() => handleDeleteAccount()}>Delete Account</button>
                                    
                                </div>
                            </div> :
                            ''
                        }
                    </div>
                    <div className='w-full md:min-w-[400px]  lg:min-w-[600px] space-y-4 max-w-[700px]'>
                        { !completedProfile &&  
                            <div className='bg-yellow-500 text-[10px] flex items-center p-2 bg-opacity-10 text-gray-500 space-x-2 '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <p>To get approval please complete your profile. We'll review and approve within 3 days</p>
                            </div>
                        }
                        <Outlet context={{setCompletedProfile}} />
                    </div>
                </div>
            </div>
    )
}

export default DoctorProfileLayout