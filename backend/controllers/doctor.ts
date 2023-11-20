import {Request, Response} from 'express'

const getDoctor = async (req: Request, res: Response) => {
    res.send('get specific doctor')
}

const getAllDoctors = async (req: Request, res: Response) => {
    res.send('get all doctors')
}

const editDoctor = async (req: Request, res: Response) => {
    res.send('edit doctor')
}

const deleteDoctor = async (req: Request, res: Response) => {
    res.send('delete doctor')
}

const getDoctorBookings = async (req: Request, res: Response) => {
    res.send('get doctors bookings')
}

const getDoctorReviews = async (req: Request, res: Response) => {
    res.send('get doctor reviews')
}


export {getDoctor, getAllDoctors, editDoctor, deleteDoctor, getDoctorBookings, getDoctorReviews}