import React,{useState, useContext, useEffect} from 'react'
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from '../UserContext'
import { UserProps } from '../types'
import axios from 'axios';
import Loading from '../Components/Loading';
import { successfulNotification } from '../notifications';

const ProfilePageLayout = () => {
    const {ready, user, setUpdateUser, setUser}: UserProps = useContext(UserContext)
    const [redirect, setRedirect] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState(true)
    const [loggedOut, setLoggedOut] = useState(false)

    const location = useLocation();

    useEffect(() => {
        setOpenMenu(false)
        }, [location]);

    if(!ready){
        return <Loading/>
    }


    if(ready && !user && !loggedOut){
        return <Navigate to={'/login'} />
    }

    if(ready && !user && loggedOut){
        return <Navigate to={'/'} />
    }

    if(ready && user && user.role === 'doctor'){
        return <Navigate to={'/doctor-profile'} />
    }

    const handleLogout = async () => {
        await axios.post('/auth/logout')
        localStorage.removeItem('token')
        setLoggedOut(true)
        setUser(null)
        successfulNotification('log out successfull')
    }

    const handleDeleteAccount = async () => {
        await axios.delete('/patient/profile')
        localStorage.removeItem('token')
        setLoggedOut(true)
        setUser(null)
        successfulNotification('account successfully deleted')
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <div className=' galaxyfold:px-7 middle:px-10 lg:px-24 md:flex md:space-x-10 lg:space-x-[100px]  md:space-y-0 '>
                <div className='h-[300px] w-[200px] md:flex flex-col items-center justify-between hidden'>
                    <div className='flex items-center flex-col space-y-1'>
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
                        <p className='text-[10px] text-center'>{user?.gender}</p>
                        <p className='text-[10px] text-center'>Blood Type: <span className='font-bold'>{user?.bloodtype}</span></p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <button className='bg-black text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-[200px] ' onClick={handleLogout}>Logout</button>
                        <button className='bg-red-500 text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-[200px]' onClick={() => console.log(user)}>Delete Account</button>
                        
                    </div>
                </div>
                <div className='h-full w-full items-center  md:hidden space-y-2  mb-10'>
                    <button onClick={() => setOpenMenu(!openMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 sm:h-6 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    {
                        openMenu ? 
                        <div className='space-y-2'>
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
                                <p className='text-[10px] text-center'>Blood Type: <span className='font-bold'>{user?.bloodtype}</span></p>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <button className='bg-black text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-full ' onClick={handleLogout}>Logout</button>
                                <button className='bg-red-500 text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-full' onClick={() => handleDeleteAccount()}>Delete Account</button>
                                
                            </div>
                        </div> :
                        ''
                    }
                    
                    
                </div>
                <div className='  md:w-[600px] w-full'>
                    <div className='flex space-x-3'>
                        <Link to={'/profile'} className='bg-blue-600 h-[30px] px-3 rounded-[4px] text-[11px] text-white flex justify-center items-center '>
                            My Bookings
                        </Link>
                        <Link to={'/profile/settings'} className='border border-gray-500 h-[30px] px-3 rounded-[4px] text-[11px] flex justify-center items-center'>
                            Settings
                        </Link>
                    </div>
                    <div className='md:w-[700px] w-full'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageLayout