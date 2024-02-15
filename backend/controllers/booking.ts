import {Request, Response} from 'express'
import Booking, {bookingType} from '../models/Booking'
import moment from 'moment';
import Doctor from '../models/Doctor';

interface MyUserRequest extends Request {
    user?: any;
}

export const isAppointmentAvailable = async (req: MyUserRequest, res: Response) => {
    const {id: doctorId} = req.params
    const { appointmentDate} = req.body

    const date = moment(appointmentDate, "DD-MM-YYYY").toISOString()

    const appointment = await Booking.find({doctor: doctorId, appointmentDate: date }) as unknown  as bookingType[]

    if(appointment.length > 0){
        res.json(appointment.map((item => item.appointmentTime)))
    }else{
        res.json(null)
    }
}
