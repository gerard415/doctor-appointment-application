import React from 'react'
import { FilledTextFieldProps, OutlinedTextFieldProps, Stack, StandardTextFieldProps, TextField, TextFieldVariants } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useState } from 'react'
import { JSX } from 'react/jsx-runtime'
import { DatePicker  } from '@mui/x-date-pickers/DatePicker'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import moment, { Moment } from 'moment'
import dayjs, { Dayjs } from 'dayjs'
import { bookingTimeValues } from '../data'

type bookingComponentType = {
  formattedDate : string | null
  setFormattedDate : React.Dispatch<React.SetStateAction<string | null>>
  currentSelect: string | null
  setCurrentSelect: React.Dispatch<React.SetStateAction<string | null>>
  selectedTime: number | null
  setSelectedTime: React.Dispatch<React.SetStateAction<number | null>>
}

const BookingComponent = ({formattedDate, setFormattedDate, currentSelect, setCurrentSelect, selectedTime, setSelectedTime}: bookingComponentType) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleSelect = (value: Date | null) => {
        setSelectedDate(value)
        setFormattedDate(moment(dayjs(value).toDate()).format('DD-MM-YYYY'))
    }

    const handleClick = (element: { name: string, value: number }) => {
      setCurrentSelect(currentSelect ? null : element.name)
      setSelectedTime( selectedTime ? null : element.value)
    }

    return (
        <div className='flex justify-center'>
            <Stack spacing={3} 
              sx={{ 
                '@media screen and (min-width: 768px)': {
                  width: '280px',
                },
                '@media screen and (min-width: 280px)': {
                  width: '100%',
                },
              }}>
              <DatePicker
                  className='text-[9px]'
                  label='Select an appointment date'
                  format='DD-MM-YYYY'
                  defaultValue={selectedDate}
                  disablePast
                  desktopModeMediaQuery='@media (min-width: 768px)'
                  onChange={newValue => handleSelect(newValue)}
                  slotProps={{
                      layout: {
                        sx: {
                          '.MuiDateCalendar-root': {
                            color: '#1565c0',
                            borderRadius: 2,
                            borderWidth: 0,
                            borderColor: '#2196f3',
                            border: '0px solid',
                            width: '280px'
                          }
                        }
                      }
                    }} 
                                
              />
              {selectedDate? 
                <div className='grid grid-cols-2 gap-2'>
                  {bookingTimeValues.map((element: { name: string, value: number }) => (
                    <button 
                      key={element.name} 
                      className='w-full border  bg-yellow-300 disabled:opacity-50 '
                      disabled={currentSelect ? currentSelect !== element.name : undefined}
                      onClick={() => handleClick(element)}
                    >
                      {element.name}
                    </button>
                  ))}
                </div>  :
                ''
              }
            </Stack>
        </div>
    )
}

export default BookingComponent