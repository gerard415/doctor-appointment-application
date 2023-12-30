import React,{useState, useContext} from 'react'
import { Link, Navigate } from "react-router-dom";
import { UserContext } from '../UserContext'
import { UserProps } from '../types'
import axios from 'axios';
import DoctorCard from '../Components/DoctorCard';

const PatientBookingsPage = () => {
    return (
        <div className='py-3 space-y-3'>
            <p className='font-bold text-[20px]'>My Bookings</p>
            <div className='flex space-x-6 overflow-x-auto'>
                <DoctorCard/>
                <DoctorCard/>
            </div>
        </div>
    )
}

export default PatientBookingsPage