"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const booking_1 = require("../controllers/booking");
const router = express_1.default.Router();
router.post('/:id', booking_1.isAppointmentAvailable);
module.exports = router;
