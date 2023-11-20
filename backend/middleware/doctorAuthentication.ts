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

    try{

        const {doctorId, name} = jwt.verify(token, SECRET) as MyToken
        req.user = {doctorId, name}  
        next()
    }
    catch(error){
        throw new UnauthenticatedError('You are not authorized to access this route')
    }
}

export = doctorAuthMiddleware