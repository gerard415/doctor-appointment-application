"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patient_1 = require("../controllers/patient");
const multer_1 = require("../utils/multer");
router.get('/profile', patient_1.getPatient);
router.patch('/profile', multer_1.photoMiddleware.single('photo'), patient_1.editPatient);
router.delete('/profile', patient_1.deletePatient);
router.get('/bookings', patient_1.getPatientBookings);
router.post('/reviews', patient_1.postDoctorReviews);
module.exports = router;
