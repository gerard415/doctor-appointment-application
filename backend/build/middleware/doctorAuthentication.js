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
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.DOCTOR_SECRET;
const doctorAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token && token !== 'null') {
        const { doctorId, name } = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = { doctorId, name };
        if (!doctorId) {
            throw new unauthenticated_1.default('Not authorized to access this route');
        }
        else {
            next();
        }
    }
    else {
        throw new unauthenticated_1.default('You are not signed in');
    }
});
module.exports = doctorAuthMiddleware;
