import React from 'react'
import { qualificationsType } from '../types'
import moment from 'moment'
import dayjs from 'dayjs'

type EducationCardType = {
  qualification: qualificationsType
}
const EducationCard = ({qualification} : EducationCardType) => {
  const startYear = moment(dayjs(qualification.startingDate).toDate()).format('YYYY')
  const endyear = moment(dayjs(qualification.endingDate).toDate()).format('YYYY')
  
  return (
    <div className='pl-3 space-y-0'>
        <p className='text-cyan-300 text-[11px] font-semibold '>{startYear}-{endyear}</p>
        <div className='flex justify-between'>
            <p className='text-gray-500 text-[10px] ' >Bsc degree in {qualification.degree}</p>
            <p className='text-gray-500 text-[10px] '>{qualification.university}</p>
        </div>
        
    </div>
  )
}

export default EducationCard