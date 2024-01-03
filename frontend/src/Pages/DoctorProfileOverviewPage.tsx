import React from 'react'
import image from '../assets/images/doctor.jpeg'
import EducationCard from '../Components/EducationCard'
import ExperienceCard from '../Components/ExperienceCard'

const DoctorProfileOverview = () => {
  return (
    <div>
        <div className=' w-full'>
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
                <div className='space-y-10'>
                    <div className='pt-7 space-y-4'>
                        <p className='text-[13px] font-semibold tracking-wide '>About of <span className='text-cyan-400 font-bold text-[15px] '>John Smith</span></p>
                        <p className='text-[12px] leading-7 text-gray-500 '>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </div>
                    <div>
                        <p className='text-[13px] font-semibold tracking-wide'>Education</p>
                        <div className='pt-2 space-y-4'>
                            <EducationCard/>
                            <EducationCard/>
                            <EducationCard/>
                        </div>
                    </div>
                    <div>
                        <p className='text-[13px] font-semibold tracking-wide'>Experience</p>
                        <div className='pt-2 grid grid-cols-2 gap-4'>
                            <ExperienceCard/>
                            <ExperienceCard/>
                            <ExperienceCard/>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorProfileOverview