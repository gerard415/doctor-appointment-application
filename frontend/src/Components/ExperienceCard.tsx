import React from 'react'
import { experienceType } from '../types'
import moment from 'moment'
import dayjs from 'dayjs'

type ExperienceCardType = {
  experience: experienceType
}

const ExperienceCard = ({experience}: ExperienceCardType) => {
  const startYear = moment(dayjs(experience.startingDate).toDate()).format('YYYY')
  const endyear = moment(dayjs(experience.endingDate).toDate()).format('YYYY')

  return (
    <div className='ml-3 space-y-1  p-2 bg-yellow-500 bg-opacity-10 '>
        <p className='text-yellow-300 text-[11px] font-semibold '>{startYear}-{endyear}</p>
        <div className=''>
            <p className='text-gray-500 text-[10px] ' >{experience.position}</p>
            <p className='text-gray-500 text-[10px] '>{experience.hospital}</p>
        </div>
    </div>
  )
}

export default ExperienceCard