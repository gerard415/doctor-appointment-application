import React from 'react'

const DoctorProfileAppointmentPage = () => {
  return (
    <div className='w-full overflow-x-auto'>
      <div className='min-w-[600px]'>
        <div className='text-[11px] flex justify-between w-full font-semibold bg-gray-50 py-1 '>
            <p className='w-[25%]'>NAME</p>
            <p className='w-[17.5%]' >GENDER</p>
            <p className='w-[17.5%]'>STATUS</p>
            <p className='w-[20%]' >BOOKED ON</p>
            <p className='w-[20%]'>TIME</p>
        </div>

      </div>
    </div>
  )
}

export default DoctorProfileAppointmentPage