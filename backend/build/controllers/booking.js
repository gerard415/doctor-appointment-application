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
exports.isAppointmentAvailable = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const moment_1 = __importDefault(require("moment"));
const isAppointmentAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: doctorId } = req.params;
    const { appointmentDate } = req.body;
    const date = (0, moment_1.default)(appointmentDate, "DD-MM-YYYY").toISOString();
    const appointment = yield Booking_1.default.find({ doctor: doctorId, appointmentDate: date });
    if (appointment.length > 0) {
        res.json(appointment.map((item => item.appointmentTime)));
    }
    else {
        res.json(null);
    }
});
exports.isAppointmentAvailable = isAppointmentAvailable;
