import React from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'
import image from '../assets/images/doctor.jpeg'
import { Link } from 'react-router-dom'
import { doctorStateProps } from '../types'

type doctorCardType = {
    doctor : doctorStateProps
}

const DoctorCard = ({doctor}: doctorCardType) => {
  return (
    <div className='middle:w-[200px] galaxyfold:w-full space-y-4'>
        <div className=' '>
            <img src={doctor.photo || image} alt="" className='middle:w-[200px] galaxyfold:w-full h-[250px]  rounded-xl ' />
        </div>
        <div className='space-y-2'>
            <p className='font-bold middle:text-[17px] text-[13px] '>Dr . {doctor.name}</p>
            <div className='flex justify-between'>
                <div className='text-center h-[30px] middle:w-[80px] middle:text-[12px] text-[9px] p-2 flex justify-center items-center bg-sky-400  bg-opacity-25 text-cyan-900 '>
                    surgeon
                </div>
                <div className='flex justify-center items-center middle:space-x-1 text-[15px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="middle:w-6 w-5 middle:h-5 h-4 fill-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <div className='flex justify-center items-center space-x-1'>
                        <p className='font-bold text-[12px] middle:text-[15px] '>{doctor.averageRating}</p>
                        <p className='text-[12px] middle:text-[14px]'>({doctor.totalRatings})</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-[9px] middle:text-[10px] flex justify-center items-center  text-gray-500'>At Mount Adora Hospital Sylnet</p>
                <Link to={`/doctors/${doctor._id}`} className='w-[30px] h-[30px] rounded-full border border-solid flex items-center justify-center '>
                    <AiOutlineArrowRight/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DoctorCard