import React, { useContext, useEffect, useState } from 'react'
import ReviewCard from '../Components/ReviewCard'
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useOutletContext, useParams } from 'react-router-dom';
import { errorNotification, successfulNotification } from '../notifications';
import moment from 'moment';
import dayjs from 'dayjs';
import { UserProps, doctorStateProps, reviewProps } from '../types';
import Loading from '../Components/Loading';
import { UserContext } from '../UserContext';

type contextProps = {
    update: boolean
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const SingleDoctorFeedbackPage = () => {
    const [text, setText] = useState<string>('')
    const [rating, setRating] = useState<number | null>(0)
    const [date, setDate] = useState<Date>(new Date)
    const [giveReview, setGiveReview] = useState(false)
    const [doctorReviews, setDoctorReviews] = useState<reviewProps[] | null>(null)
    const {update, setUpdate} = useOutletContext<contextProps>()
    const [refresh, setRefresh] = useState<boolean>(false)
    const {user}: UserProps = useContext(UserContext)

    let {id} = useParams()

    useEffect(() => {
        axios.get(`/doctor/${id}/reviews`).then(({data}) => {
            setDoctorReviews(data)
        })
    }, [refresh])

    const handleReview = async () => {
        if(!user){
            return errorNotification('Please log in to make a review')
        }

        try {
            if(text === '' || rating === 0){
                errorNotification('field cannot be empty')
            }else {
                await axios.post(`/doctor/${id}/review`, {text, rating, createdAt: moment(dayjs(date).toDate()).format('LL') })
                setText('')
                setRating(0)
                setGiveReview(false)
                setUpdate(value => !value)
                setRefresh(value => !value)
                successfulNotification('feedback received')
            }
        } catch (error) {
            errorNotification('error, please try again later')
            console.log(error)
        }
        
        
    }

    return (
        <div className='space-y-5'>
            <p className='pt-7 text-[13px] font-semibold tracking-wide '>All Reviews ( {doctorReviews?.length} )</p>
            <div>
                {!doctorReviews ? <Loading/> :
                    doctorReviews && doctorReviews.length > 0 ?
                        <div className='space-y-2'>
                            {doctorReviews.map((item) => (
                            <ReviewCard key={item._id} doctorReviews={item}/>
                            ))}
                        </div> : 
                        doctorReviews && doctorReviews.length === 0 ?
                            <div>
                                No Reviews Available
                            </div> : ''

                }
            </div>
            <div className='py-7 '>
                {!giveReview? 
                    <div className='text-center'>
                        <button className=' bg-blue-600 p-3 px-4 text-white text-[12px] rounded-3xl' onClick={() => setGiveReview(!giveReview)}>Give Feedback</button>
                    </div>
                    :
                    <div className='text-[11px] space-y-4 '>
                        <div className='space-y-4' >
                            <p>How would you rate your experience with this doctor?*</p>
                            <div>
                                <Rating name="controlled" size="small" precision={0.5} value={rating} onChange={(event, newValue) => {setRating(newValue);}}/>
                            </div>
                        </div>
                        <div className=' space-y-4 ' >
                            <p>Share your feedback or suggestions*</p>
                            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='h-[100px] pb-[60px] outline-none w-full rounded-md border border-gray-300 p-2 placeholder:top-0 ' placeholder='write your message' />
                        </div>
                        <button className=' bg-blue-600 p-3 px-4 text-white text-[12px] rounded-3xl ' onClick={() => handleReview()}>Submit Feedback</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default SingleDoctorFeedbackPage