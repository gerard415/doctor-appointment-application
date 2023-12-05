import React,{useState, useContext} from 'react'
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserContext } from '../UserContext'
import { UserProps } from '../types'
import axios from 'axios';

const ProfilePageLayout = () => {
    const {setUser, user}: UserProps = useContext(UserContext)
    const [redirect, setRedirect] = useState<boolean>(false)


    const handleLogout = async () => {
        await axios.post('/auth/logout')
        setUser(null)
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='space-x-[100px] phone:px-10 lg:px-24 flex justify-center'>
            <div className='h-[300px] w-[200px] flex flex-col items-center justify-between'>
                <div className='flex items-center flex-col space-y-1'>
                    <div className='flex justify-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[50px] w-[50px] '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[50px] w-[50px] relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className='font-bold text-[10px] text-center'>{user?.name}</p>
                    <p className='text-[10px] text-center'>{user?.email}</p>
                    <p className='text-[10px] text-center'>Blood Type: <span className='font-bold'>A+</span></p>
                </div>
                <div className='flex flex-col space-y-2'>
                    <button className='bg-black text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-[200px] ' onClick={handleLogout}>Logout</button>
                    <button className='bg-red-500 text-white h-[30px] text-[11px] text-center flex items-center justify-center rounded-[4px] w-[200px]'>Delete Account</button>
                </div>
            </div>
            <div className=' h-[400px] w-[600px]'>
                <div className='flex space-x-3'>
                    <Link to={'/profile'} className='bg-blue-600 h-[30px] px-3 rounded-[4px] text-[11px] text-white flex justify-center items-center '>
                        My Bookings
                    </Link>
                    <Link to={'/profile/settings'} className='border border-gray-500 h-[30px] px-3 rounded-[4px] text-[11px] flex justify-center items-center'>
                        Settings
                    </Link>
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageLayout