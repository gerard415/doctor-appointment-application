import React,{useState, useContext} from 'react'
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext'
import { UserProps } from '../types'
import axios from 'axios';

const DoctorDashboard = () => {
    const {setUser}: UserProps = useContext(UserContext)
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
        <div>
            Doctor Dashboard

            <div className='w-full h-[30px] items-center justify-center mb-10 '>
                <button className='w-full pl-9 flex space-x-4 ' onClick={handleLogout} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    )
}

export default DoctorDashboard