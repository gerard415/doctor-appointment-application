import {Request, Response} from 'express'
import Stripe from 'stripe'
import Doctor, { doctorType } from '../models/Doctor'
import BadRequestError from '../errors/bad-request';
import moment from 'moment';
import Booking from '../models/Booking';
import Patient from '../models/Patient';
import { StatusCodes } from 'http-status-codes';


const stripe = new Stripe(process.env.STRIPE_KEY!)

interface MyUserRequest extends Request {
    user?: any;
}

export const checkOut = async (req:MyUserRequest, res:Response) => {
    const {id: doctorId} = req.params
    const {patientId} = req.user

    const {appointmentTime, appointmentDate} = req.body

    if(appointmentTime === '' || appointmentDate === ''){
        throw new BadRequestError('Please select a date and time')
    }

    const date = moment(appointmentDate, "DD-MM-YYYY").toISOString()
    const doc = await Doctor.findById( doctorId )

    const isAppointmentAvailable = await Booking.find({ patient: patientId, doctor: doctorId, appointmentTime: appointmentTime, appointmentDate: date })

    if(isAppointmentAvailable){
        const doctor = await Doctor.findById(doctorId) as unknown as doctorType

        const customer = await stripe.customers.create({
            metadata:{
                patientId: patientId,
                doctorId: doctorId,
                appointmentDate: date,
                appointmentTime: appointmentTime,
                ticketPrice: doc?.ticketPrice!
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                    currency: `usd`,
                    product_data: {
                        name: `${doctor.name}`,
                        images:[doctor.photo],
                        description: `specialist in ${doctor.specialization}`,
                    },
                    unit_amount: doctor.ticketPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer: customer.id,
            client_reference_id: doctorId,
            success_url: 'http://localhost:3000/success-page',
            cancel_url: 'http://localhost:3000/unsuccessful-page',
        });

        res.status(StatusCodes.CREATED).json({session})
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Appointment time is not available'})
    }
}

const createAppointment = async (customer: Stripe.Response<Stripe.Customer>) => {
    const patientId = customer.metadata.patientId
    const doctorId = customer.metadata.doctorId
    const appointmentTime = customer.metadata.appointmentTime
    const appointmentDate = customer.metadata.appointmentDate
    const ticketPrice = customer.metadata.ticketPrice

    try {
        const appointment = await Booking.create({patient:patientId, doctor:doctorId, appointmentTime: appointmentTime, appointmentDate: appointmentDate, ticketPrice: ticketPrice})

        const doctor = await Doctor.findByIdAndUpdate(doctorId,
            {
            $push: {
                    appointments: appointment._id
            },
            },{new:true});
        doctor?.save()

        const patient = await Patient.findByIdAndUpdate(patientId,
            {
                $push: {
                    appointments: appointment._id
                }
            },{new:true})
        patient?.save()
    } catch (error) {
        console.log(error)
    }
}





export const webhook = (req: Request, res: Response) => {
    let data:any
    let eventType;
    let endpointSecret

    let event;
    let sig = req.headers['stripe-signature'];

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    endpointSecret = "whsec_3b5dd71554f5ec687548c3e78aad2d6264b790b57ec4f507e9d0c8f1f4a0c3d1";

    try {
        event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret)
    } catch (err) {
        console.log(`Error Message: ${err}` );
        return;
    }

    data = event.data.object
    eventType = event.type; 


    if (eventType === "checkout.session.completed") {
        try {
            stripe.customers.retrieve(data.customer)
            .then(async (customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>) => {
                if (customer.deleted !== true) {
                    createAppointment(customer)
                }
                
            })
            .catch((err) => console.log(`Error Message: ${err.message}` ));
        } catch (error) {
            console.log(`Error Message: ${error}` )
        }
        
    }

    res.sendStatus(200)
}


