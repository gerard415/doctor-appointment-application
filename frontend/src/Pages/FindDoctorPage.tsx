import React from 'react'
import DoctorCard from '../Components/DoctorCard'
import Testimonials from '../Components/Testimonials'

const FindDoctorPage = () => {
  return (
    <div className='w-full'>
      <div className='space-y-[50px] flex flex-col justify-center items-center w-screen h-[200px] bg-yellow-50  '>
        <p className='font-bold text-[30px] '>Find a Doctor</p>
        <div className='text-[13px] flex galaxyfold:w-full galaxyfold:px-7 phone:px-10 md:justify-center'>
          <input type="text" placeholder='Search by doctor name or specialization' className='bg-gray-200 galaxyfold:w-full md:w-[400px] p-2 rounded galaxyfold:text-[9px] phone:text-[11px] sm:text-[16px] ' />
          <button className='bg-blue-500 text-white p-2 rounded-r phone:w-[90px] phone:text-[11px] sm:text-[16px] galaxyfold:w-[50px] galaxyfold:text-[9px]'>Search</button>
        </div>
      </div>
      <div className='phone:px-10 galaxyfold:px-7  lg:px-24 grid grid-cols-1 justify-items-center gap-6 middle:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10'>
        <DoctorCard/>
        <DoctorCard/>
        <DoctorCard/>
        <DoctorCard/>
        <DoctorCard/>
        <DoctorCard/>
      </div>
      <div className='phone:px-10 lg:px-24 mt-10'>
        <Testimonials/>
      </div>
    </div>
  )
}

export default FindDoctorPage