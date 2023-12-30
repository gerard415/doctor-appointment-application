import React from 'react'
import image from '../assets/images/doctor.jpeg'
import { Link, NavLink, Outlet } from 'react-router-dom'

const SingleDoctorPageLayout = () => {
  return (
    <div className='flex justify-center galaxyfold:px-7 middle:px-10 '>
        <div className=' w-[600px] '>
            <div>
                <div className='h-[200px] flex space-x-3'>
                    <div className='  '>
                        <img src={image} alt="" className='h-[160px] w-[250px] middle:w-[200px] md:w-[160px]  rounded-md ' />
                    </div>
                    <div className='flex flex-col items-start'>
                        <div className='text-center h-[30px] md:w-[80px] text-[12px] p-2 flex justify-center items-center bg-sky-400  bg-opacity-25 text-cyan-900 mb-2 mt-3'>
                            surgeon
                        </div>
                        <p className='text-[15px] font-bold '>
                            John Smith
                        </p>
                        <div className='flex justify-center items-center space-x-1 text-[15px] mb-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-6 h-5 fill-yellow-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <div className='flex justify-center items-center space-x-1'>
                                <p className='font-bold'>4.5</p>
                                <p>(2)</p>
                            </div>
                        </div>
                        <p className='sm:text-[13px] text-[11px] text-gray-500 font-light md:pr-6'>
                            Adispicing expilacebo Facero libero aliquip dolorem repudiande qui
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='flex mb-2'>
                            <NavLink to={'/doctors/1'}  end>
                                {({ isActive}) => (
                                    <div className='text-[11px] text-center w-[100px] font-bold' >
                                        <span className={isActive ? "text-blue-500" : ""}>About</span>
                                    </div>
                                )}
                            </NavLink>
                            <NavLink to={'/doctors/1/feedback'}>
                                {({ isActive}) => (
                                    <div className='text-[11px] text-center w-[100px] font-bold' >
                                        <span className={isActive ? "text-blue-500" : ""}>Feedback</span>
                                    </div>
                                )}
                            </NavLink>   
                        </div>
                        <hr />
                    </div>
                    <div>
                        <Outlet/>
                    </div>
                </div>
            </div>
            <div className=' w-full middle:px-7 space-y-5 p-2 pt-4 mt-7 border border-t-gray-100 pb-4 shadow-2xl block md:hidden'>
                <div className='flex justify-between'>
                    <p className='text-[13px] text-gray-500 '>Ticket Price</p>
                    <p className=' text-[15px] font-bold '>700 BDT</p>
                </div>
                <div className='space-y-2'>
                    <p className='text-[13px] '>Avaialble Time Slots</p>
                    <div className='space-y-2' >
                        <div className='flex justify-between text-[13px] text-gray-500 '>
                            <p>Sunday:</p>
                            <p>4:30pm - 9:30pm</p>
                        </div>
                        <div className='flex justify-between text-[13px] text-gray-500 '>
                            <p>Monday:</p>
                            <p>4:30pm - 9:30pm</p>
                        </div>
                        <div className='flex justify-between text-[13px] text-gray-500 '>
                            <p>Friday:</p>
                            <p>4:30pm - 9:30pm</p>
                        </div>
                    </div>
                </div>
                <button className=' bg-blue-600 w-full h-[45px] text-white text-[12px] rounded-md '>Book Appointment</button>
            </div>
        </div>
        <div className=' w-[270px] h-full space-y-5 p-2 pt-4 pb-4 shadow-2xl hidden md:block '>
            <div className='flex justify-between'>
                <p className='text-[13px] text-gray-500 '>Ticket Price</p>
                <p className=' text-[15px] font-bold '>700 BDT</p>
            </div>
            <div className='space-y-2'>
                <p className='text-[13px] '>Avaialble Time Slots</p>
                <div className='space-y-2' >
                    <div className='flex justify-between text-[13px] text-gray-500 '>
                        <p>Sunday:</p>
                        <p>4:30pm - 9:30pm</p>
                    </div>
                    <div className='flex justify-between text-[13px] text-gray-500 '>
                        <p>Monday:</p>
                        <p>4:30pm - 9:30pm</p>
                    </div>
                    <div className='flex justify-between text-[13px] text-gray-500 '>
                        <p>Friday:</p>
                        <p>4:30pm - 9:30pm</p>
                    </div>
                </div>
            </div>
            <button className=' bg-blue-600 w-full h-[45px] text-white text-[12px] rounded-md '>Book Appointment</button>
        </div>
    </div>
  )
}

export default SingleDoctorPageLayout