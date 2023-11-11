import React from 'react'
import DoctorCard from '../Components/DoctorCard'
import Testimonials from '../Components/Testimonials'

const FindDoctorPage = () => {
  return (
    <div className=''>
      <div className='space-y-[50px] flex flex-col justify-center items-center w-screen h-[200px] bg-yellow-50 '>
        <p className='font-bold text-[30px] '>Find a Doctor</p>
        <div className='text-[13px]'>
          <input type="text" placeholder='Search by doctor name or specialization' className='bg-gray-200 w-[400px] p-2 rounded ' />
          <button className='bg-blue-500 text-white p-2 rounded-r w-[90px]'>Search</button>
        </div>
      </div>
      <div className='phone:px-10 lg:px-24 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10'>
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