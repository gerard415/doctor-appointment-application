import React, { useContext, useEffect, useState } from 'react'
import { UserProps, appointmentType } from '../types'
import { UserContext } from '../UserContext'
import moment from 'moment'
import dayjs from 'dayjs'
import axios from 'axios'
import { error } from 'console'
import Loading from '../Components/Loading'

const PatientBookingsPage = () => {
  const [appointments, setAppointments] = useState<appointmentType[] | null>(null)

  useEffect(() => {
    axios.get('patient/bookings').then(({data}) => {
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
                    <p className='w-[25%]' >{moment(dayjs(item.bookedOn).toDate()).format('MMMM Do YYYY')}</p>
                    <p className='w-[15%]'>{showTime(item.time)}</p>
                </div>
          ))

  return (
    <div className='w-full space-y-4 py-3  overflow-x-auto'>
        <p className='font-bold text-[20px]'>My Bookings</p>
        <div className='min-w-[600px]'>
            <div className='text-[11px] flex justify-between w-full font-semibold bg-gray-100 py-1 '>
                <p className='w-[25%]'>DOCTOR</p>
                <p className='w-[17.5%]' >GENDER</p>
                <p className='w-[17.5%]'>STATUS</p>
                <p className='w-[25%]' >APPOINTMENT DATE</p>
                <p className='w-[15%]'>APPOINTMENT TIME</p>
            </div>
            {!appointments ? <Loading/> : appointments?.length > 0 ? 
            <div className='space-y-1'>{view}</div> : 
            ''}
        </div>
    </div>
  )
}

export default PatientBookingsPage