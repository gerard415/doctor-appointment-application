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
exports.upload = exports.getUser = exports.logout = exports.login = exports.register = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const Doctor_1 = __importDefault(require("../models/Doctor"));
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const SECRET = process.env.PATIENT_SECRET;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!role) {
        throw new bad_request_1.default('Select a role');
    }
    if (!name || !email || !password) {
        throw new bad_request_1.default('Fields cannot be empty');
    }
    if (role === 'patient') {
        const patient = yield Patient_1.default.create(Object.assign({}, req.body));
        const token = patient.createJWT();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: patient.name, email: patient.email, role: patient.role }, token: token });
    }
    if (role === 'doctor') {
        const doctor = yield Doctor_1.default.create(Object.assign({}, req.body));
        const token = doctor.createJWT();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: doctor.name, email: doctor.email, role: doctor.role }, token: token });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    if (!email || !password) {
        throw new bad_request_1.default('Please provide both email and password');
    }
    let user = null;
    const patient = yield Patient_1.default.findOne({ email });
    const doctor = yield Doctor_1.default.findOne({ email });
    if (patient) {
        user = patient;
    }
    if (doctor) {
        user = doctor;
    }
    //finding the user with the particular email
    if (!user) {
        throw new unauthenticated_1.default('User does not exist');
    }
    //comparing passwords
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new unauthenticated_1.default('Invalid credentials');
    }
    //creating the token
    const token = user.createJWT();
    if (user === patient) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name, email: user.email, role: user.role, id: user._id, phone: user.phone, bloodtype: patient === null || patient === void 0 ? void 0 : patient.bloodtype }, token: token });
    }
    if (user === doctor) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name, email: user.email, role: user.role, id: user._id, phone: user.phone }, token: token });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', '').json('logged out');
});
exports.logout = logout;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token && token !== 'null') {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        if ('patientId' in decoded) {
            const { patientId } = decoded;
            const { name, email, phone, bloodtype, role, _id: id, photo, gender } = yield Patient_1.default.findById(patientId);
            res.status(http_status_codes_1.StatusCodes.OK).json({ name, email, phone, bloodtype, role, _id: id, photo, gender });
        }
        if ('doctorId' in decoded) {
            const { doctorId } = decoded;
            const { name, email, phone, gender, ticketPrice, specialization, qualifications, experiences, bio, role, about, averageRating, totalRatings, _id: id, photo, isApproved } = yield Doctor_1.default.findById(doctorId);
            res.status(http_status_codes_1.StatusCodes.OK).json({ name, email, phone, gender, ticketPrice, specialization, qualifications, role, experiences, bio, about, averageRating, totalRatings, _id: id, photo, isApproved });
        }
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
exports.getUser = getUser;
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fileData = {};
    if (req.file) {
        // Save image to cloudinary
        let uploadedFile;
        try {
            const localFilePath = req.file.path;
            uploadedFile = yield cloudinary_1.default.uploader.upload(localFilePath, {
                folder: "products",
                resource_type: "image",
            });
            fileData = {
                fileName: req.file.originalname,
                filePath: uploadedFile.secure_url,
            };
        }
        catch (error) {
            res.status(500);
            throw new Error('Image could not be Uploaded');
        }
    }
    res.json(fileData);
});
exports.upload = upload;
