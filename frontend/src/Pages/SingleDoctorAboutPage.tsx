import React from 'react'
import EducationCard from '../Components/EducationCard'
import ExperienceCard from '../Components/ExperienceCard'
import { doctorStateProps } from '../types'
import { useOutletContext } from 'react-router-dom'


type contextProps = {
    doctor: doctorStateProps | null
    setDoctor: React.Dispatch<React.SetStateAction<doctorStateProps | null>>
}

const SingleDoctorAboutPage = () => {
    const {doctor, setDoctor} = useOutletContext<contextProps>()

    return (
        <div className='space-y-10'>
            <div className='pt-7 space-y-4'>
                <p className='text-[13px] font-semibold tracking-wide '>About of <span className='text-cyan-400 font-bold text-[15px] '>{doctor?.name}</span></p>
                <p className='text-[12px] leading-7 text-gray-500 '>{doctor?.about}</p>
            </div>
            <div>
                <p className='text-[13px] font-semibold tracking-wide'>Education</p>
                <div className='pt-2 space-y-4'>
                    {doctor?.qualifications?.map((qualification) => (
                        <EducationCard key={qualification.degree} qualification={qualification} />
                    ))}
                </div>
            </div>
            <div>
                <p className='text-[13px] font-semibold tracking-wide'>Experience</p>
                <div className='pt-2 grid grid-cols-2 gap-4'>
                    {doctor?.experiences?.map((experience) => (
                        <ExperienceCard key={experience.startingDate} experience={experience}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleDoctorAboutPage