import React from 'react'
import image from '../assets/images/doctor.jpeg'
import { Link, NavLink, Outlet } from 'react-router-dom'

const SingleDoctorPageLayout = () => {
  return (
    <div className='flex justify-center'>
        <div className='border border-black w-[600px] h-[700px] '>
            <div className='h-[200px] flex space-x-3'>
                <div className='  '>
                    <img src={image} alt="" className='h-[160px] w-[160px]  rounded-md ' />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='text-center h-[30px] w-[80px] text-[12px] p-2 flex justify-center items-center bg-sky-400  bg-opacity-25 text-cyan-900 mb-2 mt-3'>
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
                    <p className='text-[13px] text-gray-500 font-light pr-6'>
                        Adispicing expilacebo Facero libero aliquip dolorem repudiande qui
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <div className='flex mb-2'>
                        <NavLink to={'/doctors/1'} className ={({isActive, isPending}) => isPending? 'text-[11px] text-center w-[100px] font-bold' :  isActive ? 'text-[11px] text-center w-[100px] font-bold border border-b-gray-500' : '' }>
                            About
                        </NavLink>
                        <NavLink to={'/doctors/1/feedback'} className ={({isActive}) => isActive ? 'text-[11px] text-center w-[100px] font-bold border border-b-gray-500' : 'text-[11px] text-center w-[100px] font-bold' }>
                            Feedback
                        </NavLink>   
                    </div>
                    <hr />
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
        <div className='border border-black w-[300px] h-[250px] '>

        </div>
    </div>
  )
}

export default SingleDoctorPageLayout