import {Request, Response} from 'express'

const getPatient = async (req: Request, res: Response) => {
    
    res.send('get patient')
}

const editPatient = async (req: Request, res: Response) => {
    res.send('edit patient')
}

const deletePatient = async (req: Request, res: Response) => {
    res.send('delete patient')
}

const getPatientBookings = async (req: Request, res: Response) => {
    res.send('get patients bookings')
}

const postDoctorReviews = async (req: Request, res: Response) => {
    res.send('get doctor reviews')
}

export {getPatient, editPatient, deletePatient, getPatientBookings, postDoctorReviews}