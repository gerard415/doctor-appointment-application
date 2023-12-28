import React from 'react'
import EducationCard from '../Components/EducationCard'
import ExperienceCard from '../Components/ExperienceCard'

const SingleDoctorAboutPage = () => {
    return (
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
    )
}

export default SingleDoctorAboutPage