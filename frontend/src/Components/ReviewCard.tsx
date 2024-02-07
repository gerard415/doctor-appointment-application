import { Rating } from '@mui/material';
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { reviewProps } from '../types';
import moment from 'moment';
import dayjs from 'dayjs';

type ReviewCardType = {
    doctorReviews: reviewProps
}

const ReviewCard = ({doctorReviews}: ReviewCardType) => {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#2E8BC0',
        },
    });


    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex space-x-2'>
                    {doctorReviews.patientPhoto ? 
                        <img src={doctorReviews.patientPhoto}  alt="" className='rounded-full sm:w-6 w-5 sm:h-6 h-5 relative ' /> :

                        <div className='flex justify-center items-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[30px] w-[30px] '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[40px] w-[40px] relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                    }
                    
                    <div className='text-[11px] text-gray-500 '>
                        <p className='text-indigo-400 font-bold text-[12px] ' >{doctorReviews.patientName}</p>
                        <p>{moment(dayjs(doctorReviews.createdAt).toDate()).format('LL')}</p>
                        <p className='pt-1'>{doctorReviews.text}</p>
                    </div>
                </div>
                <div>
                    <StyledRating name="read-only" size="small" value={doctorReviews.rating} readOnly />
                </div>
            </div>
        </div>
    )
}

export default ReviewCard