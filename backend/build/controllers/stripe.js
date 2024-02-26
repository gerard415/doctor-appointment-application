"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.checkOut = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Doctor_1 = __importDefault(require("../models/Doctor"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const moment_1 = __importDefault(require("moment"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Patient_1 = __importDefault(require("../models/Patient"));
const http_status_codes_1 = require("http-status-codes");
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: doctorId } = req.params;
    const { patientId } = req.user;
    const { appointmentTime, appointmentDate } = req.body;
    if (appointmentTime === '' || appointmentDate === '') {
        throw new bad_request_1.default('Please select a date and time');
    }
    const date = (0, moment_1.default)(appointmentDate, "DD-MM-YYYY").toISOString();
    const doc = yield Doctor_1.default.findById(doctorId);
    const isAppointmentAvailable = yield Booking_1.default.find({ patient: patientId, doctor: doctorId, appointmentTime: appointmentTime, appointmentDate: date });
    if (isAppointmentAvailable) {
        const doctor = yield Doctor_1.default.findById(doctorId);
        const customer = yield stripe.customers.create({
            metadata: {
                patientId: patientId,
                doctorId: doctorId,
                appointmentDate: date,
                appointmentTime: appointmentTime,
                ticketPrice: doc === null || doc === void 0 ? void 0 : doc.ticketPrice
            }
        });
        const session = yield stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: `usd`,
                        product_data: {
                            name: `${doctor.name}`,
                            images: [doctor.photo],
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
            success_url: 'https://healhub.onrender.com/success-page',
            cancel_url: 'https://healhub.onrender.com/unsuccessful-page',
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ session });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Appointment time is not available' });
    }
});
exports.checkOut = checkOut;
const createAppointment = (customer) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = customer.metadata.patientId;
    const doctorId = customer.metadata.doctorId;
    const appointmentTime = customer.metadata.appointmentTime;
    const appointmentDate = customer.metadata.appointmentDate;
    const ticketPrice = customer.metadata.ticketPrice;
    try {
        const appointment = yield Booking_1.default.create({ patient: patientId, doctor: doctorId, appointmentTime: appointmentTime, appointmentDate: appointmentDate, ticketPrice: ticketPrice });
        const doctor = yield Doctor_1.default.findByIdAndUpdate(doctorId, {
            $push: {
                appointments: appointment._id
            },
        }, { new: true });
        doctor === null || doctor === void 0 ? void 0 : doctor.save();
        const patient = yield Patient_1.default.findByIdAndUpdate(patientId, {
            $push: {
                appointments: appointment._id
            }
        }, { new: true });
        patient === null || patient === void 0 ? void 0 : patient.save();
    }
    catch (error) {
        console.log(error);
    }
});
const webhook = (req, res) => {
    let data;
    let eventType;
    let endpointSecret;
    let event;
    let sig = req.headers['stripe-signature'];
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    endpointSecret = process.env.STRIPE_END_POINT_SECRET;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.log(`Error Message: ${err}`);
        return;
    }
    data = event.data.object;
    eventType = event.type;
    if (eventType === "checkout.session.completed") {
        try {
            stripe.customers.retrieve(data.customer)
                .then((customer) => __awaiter(void 0, void 0, void 0, function* () {
                if (customer.deleted !== true) {
                    createAppointment(customer);
                }
            }))
                .catch((err) => console.log(`Error Message: ${err.message}`));
        }
        catch (error) {
            console.log(`Error Message: ${error}`);
        }
    }
    res.sendStatus(200);
};
exports.webhook = webhook;
