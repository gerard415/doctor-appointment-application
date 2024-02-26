"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSizeFormatter = exports.photoMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, 'uploads')
//     },
//     filename: function(req, file, callback){
//         callback(null, uuidv4() + '-' + Date.now() + file.originalname)
//     }
// })
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    }
    else
        (callback(null, false));
};
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]);
};
exports.fileSizeFormatter = fileSizeFormatter;
const photoMiddleware = (0, multer_1.default)({ storage, fileFilter });
exports.photoMiddleware = photoMiddleware;
