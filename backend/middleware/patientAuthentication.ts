import { Request, Response, NextFunction } from "express";
import UnauthenticatedError from "../errors/unauthenticated";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface MyUserRequest extends Request {
    user?: any;
}

type MyToken = {
    patientId: number
    name: string
  }

const SECRET: Secret = process.env.PATIENT_SECRET!

const patientAuthMiddleware = async (req: MyUserRequest, res: Response, next:NextFunction) => {
    const {token} = req.cookies

    try{

        const {patientId, name} = jwt.verify(token, SECRET) as MyToken
        req.user = {patientId, name}  
        next()
    }
    catch(error){
        throw new UnauthenticatedError('You are not authorized to access this route')
    }
}

export default patientAuthMiddleware