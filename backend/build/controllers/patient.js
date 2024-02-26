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
exports.createPatientBookings = exports.postDoctorReviews = exports.getPatientBookings = exports.deletePatient = exports.editPatient = exports.getPatient = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const Review_1 = __importDefault(require("../models/Review"));
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Doctor_1 = __importDefault(require("../models/Doctor"));
const Booking_1 = __importDefault(require("../models/Booking"));
const moment_1 = __importDefault(require("moment"));
const SECRET = process.env.PATIENT_SECRET;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token && token !== 'null') {
        const { patientId } = jsonwebtoken_1.default.verify(token, SECRET);
        const { name, email, phone, gender, bloodtype, _id: id } = yield Patient_1.default.findById(patientId);
        res.status(http_status_codes_1.StatusCodes.OK).json({ name, email, phone, gender, bloodtype, _id: id });
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.getPatient = getPatient;
const editPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    const { name, bloodtype, phone, photo } = req.body;
    if (name === '') {
        throw new bad_request_1.default('Field cannot be empty');
    }
    if (token && token !== 'null') {
        const { patientId } = jsonwebtoken_1.default.verify(token, SECRET);
        const user = yield Patient_1.default.findOneAndUpdate({ _id: patientId }, { name, bloodtype, phone, photo }, { new: true, runValidators: true });
        user === null || user === void 0 ? void 0 : user.save();
        // const {name, email, phone, role, appointments, _id:id, bloodtype, photo} = user as patientType
        res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.editPatient = editPatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
    if (token && token !== 'null') {
        const { patientId } = jsonwebtoken_1.default.verify(token, SECRET);
        yield Patient_1.default.findByIdAndDelete(patientId);
        res.status(http_status_codes_1.StatusCodes.OK).json('user successfully deleted');
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.deletePatient = deletePatient;
const getPatientBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.user;
    const appointments = yield Booking_1.default.find({ patient: patientId });
    if (appointments.length > 0) {
        res.json(yield Promise.all(appointments.map(({ doctor, status, appointmentDate, appointmentTime }) => __awaiter(void 0, void 0, void 0, function* () {
            const findDoctor = yield Doctor_1.default.findById(doctor);
            return { name: findDoctor.name, gender: findDoctor.gender, status, bookedOn: appointmentDate, time: appointmentTime };
        }))));
        // res.status(StatusCodes.OK).json(appointments)
    }
    else {
        res.json([]);
    }
});
exports.getPatientBookings = getPatientBookings;
const createPatientBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: doctorId } = req.params;
    const { patientId } = req.user;
    const { appointmentTime, appointmentDate } = req.body;
    if (appointmentTime === '' || appointmentDate === '') {
        throw new bad_request_1.default('Please select a date and time');
    }
    const date = (0, moment_1.default)(appointmentDate, "DD-MM-YYYY").toISOString();
    const doc = yield Doctor_1.default.findById(doctorId);
    const isAppointmentAvailable = yield Booking_1.default.find({ patient: patientId, doctor: doctorId, appointmentTime: appointmentTime, appointmentDate: date });
    if (isAppointmentAvailable.length === 0) {
        const appointment = yield Booking_1.default.create({ patient: patientId, doctor: doctorId, appointmentTime: appointmentTime, appointmentDate: date, ticketPrice: doc === null || doc === void 0 ? void 0 : doc.ticketPrice });
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
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ appointment });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Appointment time is not available' });
    }
});
exports.createPatientBookings = createPatientBookings;
const postDoctorReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: doctorId } = req.params;
    const { patientId } = req.user;
    const { text, rating, createdAt } = req.body;
    if (!text || !rating || !createdAt) {
        throw new bad_request_1.default('Field cannot be empty');
    }
    const date = (0, moment_1.default)(createdAt, "LL").toISOString();
    const patient = yield Patient_1.default.findById(patientId);
    const doctorReview = yield Review_1.default.create({ doctor: doctorId, patient: patientId, patientName: patient.name, patientPhoto: patient.photo, text: text, rating: rating, createdAt: date });
    const reviews = yield Review_1.default.find({ doctor: doctorId });
    const doc = yield Doctor_1.default.findById(doctorId);
    const ratingsSum = reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
    const aveRating = ratingsSum / (doc.totalRatings + 1);
    const doctor = yield Doctor_1.default.findByIdAndUpdate(doctorId, {
        $push: {
            reviews: doctorReview._id
        },
        $inc: {
            totalRatings: 1
        },
        $set: {
            averageRating: Math.round(aveRating)
        }
    }, { new: true });
    doctor === null || doctor === void 0 ? void 0 : doctor.save();
    const { patientName, patientPhoto, text: patientsText, rating: patientsRating, createdAt: dateCreated } = doctorReview;
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ patientName, patientPhoto, text: patientsText, rating: patientsRating, dateCreated });
});
exports.postDoctorReviews = postDoctorReviews;
