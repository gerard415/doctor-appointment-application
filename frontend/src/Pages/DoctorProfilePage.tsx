import React, { useContext, useState } from 'react'
import { UserProps, doctorStateProps, experienceType, imageProps, qualificationsType } from '../types'
import { UserContext } from '../UserContext'
import { Phone } from '@mui/icons-material'
import ImageUploader from '../Components/ImageUploader'
import { errorNotification, successfulNotification } from '../notifications'
import exp from 'constants'
import axios from 'axios'
import { Navigate, useOutletContext } from 'react-router-dom'
import Select from "react-select";

type contextProps = {
    setCompletedProfile: React.Dispatch<React.SetStateAction<boolean>>
}

const DoctorProfilePage = () => {
    const {setUpdateUser, user, ready}: UserProps = useContext(UserContext)
    const {setCompletedProfile} = useOutletContext<contextProps>()

    const fullName = user?.name?.split(' ')
    const [firstname, setFirstName] = useState<string>(!fullName ? '' : fullName[0])
    const [lastname, setLastName] = useState<string>(!fullName ? '' : fullName[1])
    const [email, setEmail] = useState<string | undefined>(user?.email)
    const [phone, setPhone] = useState<number | undefined>(user?.phone)
    const [bio, setBio] = useState<string | undefined>(user?.bio)
    const [gender, setGender] = useState<string| undefined>(user?.gender)
    const [specialization, setSpecialization] = useState<string | undefined>(user?.specialization)
    const [ticketPrice, setTicketPrice] = useState<number | undefined>(user?.ticketPrice)
    const [qualifications, setQualifications] = useState<qualificationsType[] | undefined>(user?.qualifications)
    const [experience, setExperience] = useState<experienceType[] | undefined>(user?.experiences)
    const [about, setAbout] = useState<string | undefined>(user?.about)
    const [photo, setPhoto] = useState<string | undefined>(user?.photo)
    const [redirect, setRedirect] = useState<boolean>(false)

    const handleQualificationsChange = (e: React.ChangeEvent<HTMLInputElement> , index: number) => {
        const newArray = qualifications?.map((item, i) => {
            if (index === i) {
              return { ...item, [e.target.name]: e.target.value };
            } else {
              return item;
            }
        });
        setQualifications(newArray)
    }

    const addQualification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setQualifications(prev => [...prev!, {startingDate: '', endingDate: '', degree: '', university: ''}])
    }

    const removeQualification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
        e.preventDefault()
        setQualifications(qualifications?.filter((item, index) => index !== i))
    }

    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement> , index: number) => {
        const newArray = experience?.map((item, i) => {
            if (index === i) {
              return { ...item, [e.target.name]: e.target.value };
            } else {
              return item;
            }
        });
        setExperience(newArray)
    }

    const addExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setExperience(prev => [...prev!, {startingDate: '', endingDate: '', position: '', hospital: ''}])
    }

    const removeExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
        e.preventDefault()
        setExperience(experience?.filter((item, index) => index !== i))
    }

    const updateProfile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(firstname === '' || lastname === '' || phone === 0 || bio === '' || gender === '' || specialization === '' || qualifications?.length === 0 || experience?.length === 0 || photo === '' || about === ''){
            return errorNotification('Please fill complete the whole form')
        }

        if(qualifications && qualifications.length > 0 ){
            qualifications?.map((item) => {
                if(item.startingDate === '' || item.endingDate === ''  || item.degree === '' || item.university === ''){
                    return errorNotification('Please completely fill out the qualifications section')
                }
            })
        }

        if(experience && experience.length > 0 ){
            experience?.map((item) => {
                if(item.startingDate === '' || item.endingDate === ''  || item.position === '' || item.hospital === ''){
                    return errorNotification('Please completely fill out the experience section')
                }
            })
        }

        try {
            await axios.patch('/doctor/profile', {
              name:firstname+ ' ' +lastname, phone, bio, gender, specialization, qualifications, experiences:experience, about, photo:photo, isApproved: 'pending'
            })
            setUpdateUser(prev => !prev)
            setCompletedProfile(true)
            setRedirect(true)
            successfulNotification('profile updated successfully')
        } catch (error) {
            errorNotification('profile could not be updated')
            console.log(error)
        }
    }

    if(redirect){
        return <Navigate to={'/doctor-profile'}/>
    }


    return (
        <div className=' w-full space-y-8'>
            <p className='font-semibold text-[17px]'>Profile Information</p>
            <div className=' text-[11px] space-y-4 '>
                <div className='sm:flex justify-between space-y-4 sm:space-y-0 sm:space-x-3'>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label className='text-[13px]' htmlFor="">First Name*</label>
                        <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' className='w-full text-gray-500 p-2 rounded border outline-none ' />
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label className='text-[13px]' htmlFor="">Last Name*</label>
                        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='w-full text-gray-500 p-2 rounded border outline-none ' />
                    </div>
                </div>
                
                <div className='flex flex-col space-y-2'>
                    <label className='text-[13px]' htmlFor="">Email*</label>
                    <input type="text" value={email} disabled placeholder='Email' className='w-full p-2 rounded border outline-none text-gray-500 ' />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='text-[13px]' htmlFor="">Phone*</label>
                    <input type="number" name="phone" value={phone === 0 ? '' : phone} onChange={(e) => setPhone(Number(e.target.value))} placeholder='phone number'  id=""  className='border w-full h-[30px] text-gray-500 p-2 outline-none appearance-none '/>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='text-[13px]' htmlFor="">Bio*</label>
                    <input type="text" defaultValue={bio}  onChange={(e) => setBio(e.target.value)}  placeholder='Bio' className='w-full p-2 rounded border outline-none ' />
                </div>
                <div className='sm:flex justify-between space-y-4 sm:space-y-0 sm:space-x-3'>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label className='text-[13px]' htmlFor="">Gender*</label>
                        {user?.gender ? 
                            <select disabled className=' w-full p-2 rounded border outline-none text-gray-500'> 
                                <option value="">{gender}</option>
                            </select> : 

                            <select name="" value={gender} placeholder={gender} onChange={(e) => setGender(e.target.value)} className=' w-full p-2 rounded border outline-none text-gray-500' id="">
                                <option className='w-full p-2 rounded border outline-none text-gray-500' value="">Select</option>
                                <option className='w-full p-2 rounded border outline-none text-gray-500' value="male">Male</option>
                                <option className='w-full p-2 rounded border outline-none text-gray-500' value="female">Female</option>
                            </select>
                        }
                        
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label className='text-[13px]' htmlFor="">Specialization*</label>
                        <input type="text" defaultValue={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder='Specialization' className='w-full p-2 rounded border outline-none text-gray-500' />
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label className='text-[13px]' htmlFor="">Ticket price*</label>
                        <input type="number" value={ticketPrice} disabled placeholder='0' className='w-full p-2 rounded border outline-none text-gray-500' />
                    </div>
                </div>
                <div className='space-y-3'>
                    <label className='text-[13px]' htmlFor="">Qualifications*</label>
                    <div className='space-y-7'>
                        {qualifications?.map((item, index) => (
                            <div key={index} className='space-y-4'>
                                <div  className='grid grid-cols-1 sm:grid-cols-2 gap-3' >
                                    <div className='flex flex-col space-y-2'>
                                        <label htmlFor="">Starting Date*</label>
                                        <input
                                            name='startingDate'
                                            value={item.startingDate} 
                                            onChange={(e) => handleQualificationsChange(e, index)}  
                                            type="date" 
                                            className='w-full p-2 rounded border outline-none ' 
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        <label htmlFor="">Ending Date*</label>
                                        <input
                                            name='endingDate' 
                                            value={item.endingDate}
                                            onChange={(e) => handleQualificationsChange(e, index)}
                                            type="date" 
                                            className='w-full p-2 rounded border outline-none ' 
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-2 w-full'>
                                        <label htmlFor="">Degree*</label>
                                        <input 
                                            name='degree' 
                                            value={item.degree}
                                            onChange={(e) => handleQualificationsChange(e, index)}
                                            type="text" 
                                            placeholder='Degree' 
                                            className='w-full p-2 rounded border outline-none' 
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-2 w-full'>
                                        <label htmlFor="">University*</label>
                                        <input 
                                            name='university' 
                                            value={item.university}
                                            onChange={(e) => handleQualificationsChange(e, index)}
                                            type="text" 
                                            placeholder='University' 
                                            className='w-full p-2 rounded border outline-none' 
                                        />
                                    </div>
                                </div>
                                <button onClick={(e) => removeQualification(e, index)} className='bg-red-500 text-white rounded-full p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                            
                        ))}
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <button className='text-white bg-black p-2 w-[130px] rounded ' onClick={(e) => addQualification(e)}  >Add Qualifications</button>
                    </div>
                </div>
                <div className='space-y-4'>
                    <label className='text-[13px]' htmlFor="">Experiences*</label>
                    <div className='space-y-7'>
                        {experience?.map((item, index) => (
                            <div key={index} className='space-y-4'>
                                <div  className='grid grid-cols-1 sm:grid-cols-2 gap-3' >
                                    <div className='flex flex-col space-y-2'>
                                        <label htmlFor="">Starting Date*</label>
                                        <input 
                                            name='startingDate'
                                            type="date" 
                                            className='w-full p-2 rounded border outline-none' 
                                            value={item.startingDate}
                                            onChange={(e) => handleExperienceChange(e, index)}  
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        <label htmlFor="">Ending Date*</label>
                                        <input 
                                            name='endingDate'
                                            type="date" 
                                            className='w-full p-2 rounded border outline-none ' 
                                            value={item.endingDate}
                                            onChange={(e) => handleExperienceChange(e, index)} 
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-2 w-full'>
                                        <label htmlFor="">Position*</label>
                                        <input 
                                            name='position'
                                            type="text" 
                                            placeholder='Position' 
                                            className='w-full p-2 rounded border outline-none' 
                                            value={item.position}
                                            onChange={(e) => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-2 w-full'>
                                        <label htmlFor="">Hospital*</label>
                                        <input 
                                            name='hospital'
                                            type="text" 
                                            placeholder='Hospital' 
                                            className='w-full p-2 rounded border outline-none' 
                                            value={item.hospital}
                                            onChange={(e) => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <button onClick={(e) => removeExperience(e, index)} className='bg-red-500 text-white rounded-full p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex flex-col space-y-2'>
                        <button className='text-white bg-black p-2 w-[130px] rounded ' onClick={(e) => addExperience(e)}>Add Experience</button>
                    </div>
                </div>
                <div className='flex flex-col space-y-2 '>
                    <label htmlFor="">About*</label>
                    <input type="text" defaultValue={about} onChange={(e) => setAbout(e.target.value)} placeholder='Name' className='w-full h-[130px] p-2 pb-[90px] rounded border outline-none text-gray-500' />
                </div>
                <div className='flex space-x-2 items-center'>
                    {photo ? 
                    <img key={photo} src={photo}  alt="" className='rounded-full h-[40px] w-[40px] ' /> :
                    
                    user?.photo ? 
                    <img src={user?.photo}  alt="" className='rounded-full h-[40px] w-[40px] ' /> :

                    <div className='flex justify-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[40px] w-[40px] '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[50px] w-[50px] relative top-1">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }
                    <ImageUploader photo={photo} setPhoto={setPhoto} />
                </div>
                <button className=' bg-blue-600 w-full h-[30px] text-white text-[12px] rounded-md' onClick={(e) => updateProfile(e)} >Update profile</button>
            </div>
        </div>
    )
}

export default DoctorProfilePage