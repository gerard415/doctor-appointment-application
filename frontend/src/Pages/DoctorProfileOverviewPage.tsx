import React, { useContext } from 'react'
import image from '../assets/images/doctor.jpeg'
import EducationCard from '../Components/EducationCard'
import ExperienceCard from '../Components/ExperienceCard'
import { UserContext } from '../UserContext'
import { UserProps } from '../types'

const DoctorProfileOverview = () => {
    const { user, ready}: UserProps = useContext(UserContext)

    return (
        <div>
            <div className=' w-full '>
                <div className='h-[200px] flex space-x-3'>
                    <div className='  '>
                        {user?.photo ? 
                            <img src={user?.photo} alt="" className='h-[160px] sm:w-[200px] middle:w-[200px] md:w-[160px]  rounded-md ' /> :

                            <div className='flex justify-center items-center bg-gray-500 text-white border border-gray-500 overflow-hidden h-[160px] sm:w-[200px] middle:w-[200px] md:w-[160px]  rounded-md '>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[160px] sm:w-[200px] middle:w-[200px] md:w-[160px]">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </div>
                        }
                        
                    </div>
                    <div className='flex flex-col items-start'>
                        <div className='text-center h-[30px] md:w-[80px] text-[12px] p-2 flex justify-center items-center bg-sky-400  bg-opacity-25 text-cyan-900 mb-2 mt-3'>
                            {user?.specialization}
                        </div>
                        <p className='text-[15px] font-bold '>
                            {user?.name}
                        </p>
                        <div className='flex justify-center items-center space-x-1 text-[15px] mb-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-6 h-5 fill-yellow-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <div className='flex justify-center items-center space-x-1'>
                                <p className='font-bold'>{user?.averageRating}</p>
                                <p>({user?.totalRatings})</p>
                            </div>
                        </div>
                        <p className='sm:text-[13px] text-[11px] text-gray-500 font-light md:pr-6'>
                            {user?.bio}
                        </p>
                    </div>
                </div>
                <div>
                    <div className='space-y-10'>
                        <div className='pt-7 space-y-4'>
                            <p className='text-[13px] font-semibold tracking-wide '>About of <span className='text-cyan-400 font-bold text-[15px] '>{user?.name}</span></p>
                            <p className='text-[12px] leading-7 text-gray-500 '>{user?.about}</p>
                        </div>
                        <div>
                            <p className='text-[13px] font-semibold tracking-wide'>Education</p>
                            <div className='pt-2 space-y-4'>
                                {user?.qualifications?.map((qualification) => (
                                    <EducationCard key={qualification.degree} qualification={qualification}/>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className='text-[13px] font-semibold tracking-wide'>Experience</p>
                            <div className='pt-2 grid grid-cols-2 gap-4'>
                                {user?.experiences?.map((experience) => (
                                    <ExperienceCard key={experience.position} experience={experience}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfileOverview