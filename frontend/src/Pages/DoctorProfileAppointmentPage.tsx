import React, { useContext, useEffect, useState } from 'react'
import { UserProps, appointmentType } from '../types'
import { UserContext } from '../UserContext'
import moment from 'moment'
import dayjs from 'dayjs'
import axios from 'axios'
import { error } from 'console'
import Loading from '../Components/Loading'

const DoctorProfileAppointmentPage = () => {
  const [appointments, setAppointments] = useState<appointmentType[] | null>(null)

  useEffect(() => {
    axios.get('doctor/profile/bookings').then(({data}) => {
      setAppointments(data)
      console.log(data)
    }).catch((error) => console.log(error))
  }, [])

  let view

  const showTime = (time: number) => {
    if(time === 8){
      return "8 - 10 AM"
    }

    if(time === 10){
      return "10 - 12 AM"
    }

    if(time === 13){
      return "1 - 3 PM"
    }

    if(time === 15){
      return "3-5 PM"
    }
  }

  view = appointments?.map((item) => (
                <div className='text-[11px] flex justify-between w-full  py-1 '>
                    <p className='w-[25%]'>{item.name}</p>
                    <p className='w-[17.5%]' >{item.gender}</p>
                    <p className='w-[17.5%]'>{item.status}</p>
                    <p className='w-[30%]' >{moment(dayjs(item.bookedOn).toDate()).format('MMMM Do YYYY')}</p>
                    <p className='w-[10%]'>{showTime(item.time)}</p>
                </div>
          ))

  return (
    <div className='w-full overflow-x-auto'>
      <div className='min-w-[600px]'>
        <div className='text-[11px] flex justify-between w-full font-semibold bg-gray-100 py-1 '>
            <p className='w-[25%]'>NAME</p>
            <p className='w-[17.5%]' >GENDER</p>
            <p className='w-[17.5%]'>STATUS</p>
            <p className='w-[30%]' >BOOKED FOR</p>
            <p className='w-[10%]'>TIME</p>
        </div>
        {!appointments ? <Loading/> : appointments?.length > 0 ? 
          <div className='space-y-1'>{view}</div> : 
          ''}
      </div>
    </div>
  )
}

export default DoctorProfileAppointmentPage