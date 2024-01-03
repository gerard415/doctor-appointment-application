import React, { useContext } from 'react'
import { UserProps } from '../types'
import { UserContext } from '../UserContext'

const DoctorProfilePage = () => {
    const {setUser, user, ready}: UserProps = useContext(UserContext)

    return (
        <div className=' w-[500px] space-y-8'>
            <p className='font-semibold text-[17px]'>Profile Information</p>
            <div className=' text-[11px] space-y-4 '>
                <div className='flex flex-col space-y-2 '>
                    <label htmlFor="">Name*</label>
                    <input type="text" placeholder='Name' className='w-full p-2 rounded border outline-none ' />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="">Email*</label>
                    <input type="text" placeholder='Email' className='w-full p-2 rounded border outline-none ' />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="">Phone*</label>
                    <input type="text" placeholder='Phone' className='w-full p-2 rounded border outline-none ' />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="">Bio*</label>
                    <input type="text" placeholder='Bio' className='w-full p-2 rounded border outline-none ' />
                </div>
                <div className='flex justify-between space-x-3'>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label htmlFor="">Gender*</label>
                        <select name="" className=' w-full p-2 rounded border outline-none' id="">
                            <option className='w-full p-2 rounded border outline-none' value="">Select</option>
                        </select>
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label htmlFor="">Specialization*</label>
                        <input type="text" placeholder='Specialization' className='w-full p-2 rounded border outline-none' />
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label htmlFor="">Ticket price*</label>
                        <input type="number" placeholder='0' className='w-full p-2 rounded border outline-none' />
                    </div>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="">Qualifications*</label>
                    <button className='text-white bg-black p-2 w-[130px] rounded '>Add Qualifications</button>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="">Experiences*</label>
                    <button className='text-white bg-black p-2 w-[130px] rounded '>Add Experience</button>
                </div>
                <div className='flex flex-col space-y-2 '>
                    <label htmlFor="">About*</label>
                    <input type="text" placeholder='Name' className='w-full h-[130px] p-2 pb-[90px] rounded border outline-none ' />
                </div>
                <div className='flex space-x-2'>
                    {user?.photo ? 
                    <img src={user.photo}  alt="" className='rounded-full h-[40px] w-[40px] ' /> :

                    <div className='flex justify-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[40px] w-[40px] '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[50px] w-[50px] relative top-1">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }
                    <button className='p-2 bg-gray-200 rounded-md opacity-75 text-[12px] '>Upload Photo</button>
                </div>
                <button className=' bg-blue-600 w-full h-[30px] text-white text-[12px] rounded-md '>Update profile</button>
            </div>
        </div>
    )
}

export default DoctorProfilePage