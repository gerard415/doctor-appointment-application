import React from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'
import picture1 from '../assets/images/picture1.png'
import picture2 from '../assets/images/picture2.png'
import picture3 from '../assets/images/picture3.png'

const ProvideMedicalServices = () => {
  return (
    <div className=''>
        <div className='flex flex-col justify-center items-center text-center mx-auto lg:px-20'>
            <h1 className='text-[19px] leading-normal mb-2 font-bold text-black'>
                Providing the best Medical Services
            </h1>
            <p className="text-gray-500 leading-relaxed font-light mx-auto text-[13px] ">
                    World class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic
            </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] '>
            <div className='py-[30px] flex flex-col items-center'>
                <div className='flex items-center justify-center h-[150px] w-[150px]'>
                    <img src={picture1} className='h-[140px] ' />
                </div>
                <div className='mt-[30px] flex flex-col justify-center items-center'>
                    <h2 className='text-[17px] leading-9 font-[700] text-center '>
                        Find a Doctor
                    </h2>
                    <p className='text-[13px] text-gray-500 leading-7 font-[400] mt-4 text-center'>
                        World class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic
                    </p>
                    <div className='w-[35px] h-[35px] rounded-full border border-solid flex items-center justify-center mt-[30px]'>
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </div>
            <div className='py-[30px]'>
                <div className='flex items-center justify-center'>
                    <img src={picture2} className='h-[150px] w-[150px] ' />
                </div>
                <div className='mt-[30px] flex flex-col justify-center items-center'>
                    <h2 className='text-[17px] leading-9 font-[700] text-center '>
                        Find a Location
                    </h2>
                    <p className='text-[13px] text-gray-500 leading-7 font-[400] mt-4 text-center'>
                        World class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic
                    </p>
                    <div className='w-[35px] h-[35px] rounded-full border border-solid flex items-center justify-center mt-[30px]'>
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </div>
            <div className='py-[30px] flex flex-col justify-center items-center'>
                <div className='flex items-center justify-center h-[150px] w-[150px]'>
                    <img src={picture3} className='h-[100px] ' />
                </div>
                <div className='mt-[30px] flex flex-col justify-center items-center'>
                    <h2 className='text-[17px] leading-9 font-[700] text-center '>
                        Book Appointment
                    </h2>
                    <p className='text-[13px] text-gray-500 leading-7 font-[400] mt-4 text-center'>
                        World class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic
                    </p>
                    <div className='w-[35px] h-[35px] rounded-full border border-solid flex items-center justify-center mt-[30px]'>
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProvideMedicalServices