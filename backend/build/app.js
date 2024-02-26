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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const connect_1 = __importDefault(require("./db/connect"));
//routers
const auth_1 = __importDefault(require("./routes/auth"));
const patient_1 = __importDefault(require("./routes/patient"));
const doctor_1 = __importDefault(require("./routes/doctor"));
const booking_1 = __importDefault(require("./routes/booking"));
const stripe_1 = __importDefault(require("./routes/stripe"));
//error handlers
const not_found_1 = __importDefault(require("./middleware/not-found"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const patientAuthentication_1 = __importDefault(require("./middleware/patientAuthentication"));
//middleware
app.use((0, cors_1.default)({ credentials: true, origin: 'https://healhub.onrender.com' }));
app.use('/stripe/webhook', express_1.default.raw({ type: 'application/json' }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use('/auth', auth_1.default);
app.use('/patient', patientAuthentication_1.default, patient_1.default);
app.use('/doctor', doctor_1.default);
app.use('/booking', booking_1.default);
app.use('/stripe', stripe_1.default);
//errors
app.use(not_found_1.default);
app.use(errorHandler_1.default);
const port = process.env.PORT || 8000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
