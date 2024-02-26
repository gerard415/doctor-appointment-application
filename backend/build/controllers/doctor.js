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
exports.getDoctorReviews = exports.getDoctorBookings = exports.deleteDoctor = exports.editDoctor = exports.getAllDoctors = exports.getDoctorProfile = exports.getDoctor = void 0;
const Doctor_1 = __importDefault(require("../models/Doctor"));
const http_status_codes_1 = require("http-status-codes");
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Review_1 = __importDefault(require("../models/Review"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Patient_1 = __importDefault(require("../models/Patient"));
const SECRET = process.env.DOCTOR_SECRET;
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: doctorId } = req.params;
    const { name, email, phone, gender, photo, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id: id } = yield Doctor_1.default.findById(doctorId);
    res.status(http_status_codes_1.StatusCodes.OK).json({ name, email, phone, gender, photo, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id: id });
});
exports.getDoctor = getDoctor;
const getDoctorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token && token !== 'null') {
        const { doctorId } = jsonwebtoken_1.default.verify(token, SECRET);
        const { name, email, phone, gender, photo, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id: id, appointments } = yield Doctor_1.default.findById(doctorId);
        res.status(http_status_codes_1.StatusCodes.OK).json({ name, email, phone, gender, photo, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, appointments, _id: id });
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.getDoctorProfile = getDoctorProfile;
const getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield Doctor_1.default.find().sort();
    res.status(http_status_codes_1.StatusCodes.OK).json({ doctors, count: doctors.length });
});
exports.getAllDoctors = getAllDoctors;
const editDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    const { name, phone, bio, gender, specialization, qualifications, experiences, about, photo, isApproved } = req.body;
    if (token && token !== 'null') {
        const { doctorId } = jsonwebtoken_1.default.verify(token, SECRET);
        const user = yield Doctor_1.default.findOneAndUpdate({ _id: doctorId }, { name, phone, bio, gender, specialization, qualifications, experiences, about, photo, isApproved }, { new: true, runValidators: true });
        user === null || user === void 0 ? void 0 : user.save();
        // const {name, email, phone, gender, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id:id, appointments} = user as doctorType
        res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.editDoctor = editDoctor;
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
    if (token && token !== 'null') {
        const { doctorId } = jsonwebtoken_1.default.verify(token, SECRET);
        yield Doctor_1.default.findByIdAndDelete(doctorId);
        res.status(http_status_codes_1.StatusCodes.OK).json('user successfully deleted');
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.deleteDoctor = deleteDoctor;
const getDoctorBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.user;
    const appointments = yield Booking_1.default.find({ doctor: doctorId });
    if (appointments.length > 0) {
        res.json(yield Promise.all(appointments.map(({ patient, status, appointmentDate, appointmentTime }) => __awaiter(void 0, void 0, void 0, function* () {
            const findPatient = yield Patient_1.default.findById(patient);
            return { name: findPatient.name, gender: findPatient.gender, status, bookedOn: appointmentDate, time: appointmentTime };
        }))));
    }
    else {
        res.json([]);
    }
});
exports.getDoctorBookings = getDoctorBookings;
const getDoctorReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: doctorId } = req.params;
    const doctorReviews = yield Review_1.default.find({ doctor: doctorId });
    if (doctorReviews.length > 0) {
        res.json(yield Promise.all(doctorReviews.map(({ patient, patientName, patientPhoto, text, rating, createdAt, _id }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield Patient_1.default.findById(patient);
            return { patientName, patientPhoto: user.photo, text, rating, createdAt, _id };
        }))));
    }
    else {
        res.json([]);
    }
});
exports.getDoctorReviews = getDoctorReviews;
