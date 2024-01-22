import { Request, Response, NextFunction } from "express";
import UnauthenticatedError from "../errors/unauthenticated";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface MyUserRequest extends Request {
    user?: any;
}

type MyToken = {
    doctorId: number
    name: string
  }

const SECRET: Secret = process.env.DOCTOR_SECRET!

const doctorAuthMiddleware = async (req: MyUserRequest, res: Response, next:NextFunction) => {
    const {token} = req.cookies

    const {doctorId, name} = jwt.verify(token, SECRET) as MyToken
    req.user = {doctorId, name}  

    if(!doctorId){
        throw new UnauthenticatedError('Not authorized to access this route')
    }else{
        next()
    }
}

export = doctorAuthMiddleware