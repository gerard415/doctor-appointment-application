import React from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'
import image from '../assets/images/doctor.jpeg'

const DoctorCard = () => {
  return (
    <div className='w-[200px] space-y-4'>
        <div className=' '>
            <img src={image} alt="" className='w-[200px] h-[230px]  rounded-xl ' />
        </div>
        <div className='space-y-2'>
            <p className='font-bold text-[17px] '>Dr . Alfaz Ahmed</p>
            <div className='flex justify-between'>
                <div className='text-center h-[30px] w-[80px] text-[12px] p-2 flex justify-center items-center bg-sky-400  bg-opacity-25 text-cyan-900 '>
                    surgeon
                </div>
                <div className='flex justify-center items-center space-x-1 text-[15px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-6 h-5 fill-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <div className='flex justify-center items-center space-x-1'>
                        <p className='font-bold'>4.5</p>
                        <p>(2)</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-[10px] flex justify-center items-center  text-gray-500'>At Mount Adora Hospital Sylnet</p>
                <div className='w-[30px] h-[30px] rounded-full border border-solid flex items-center justify-center '>
                    <AiOutlineArrowRight/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorCard