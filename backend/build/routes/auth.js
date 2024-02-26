"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../controllers/auth");
const multer_1 = require("../utils/multer");
router.post('/register', multer_1.photoMiddleware.single('photo'), auth_1.register);
router.post('/login', auth_1.login);
router.post('/logout', auth_1.logout);
router.get('/user', auth_1.getUser);
router.post('/upload', multer_1.photoMiddleware.single('photo'), auth_1.upload);
module.exports = router;
