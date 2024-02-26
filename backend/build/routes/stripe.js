"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const stripe_1 = require("../controllers/stripe");
const patientAuthentication_1 = __importDefault(require("../middleware/patientAuthentication"));
router.post('/create-checkout-session/:id', patientAuthentication_1.default, stripe_1.checkOut);
router.post('/webhook', express_1.default.raw({ type: 'application/json' }), stripe_1.webhook);
module.exports = router;
