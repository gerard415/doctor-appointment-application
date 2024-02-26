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
    const token = req.headers.authorization?.split(' ')[1]

    if(token && token !== 'null'){
        const {patientId, name} = jwt.verify(token, SECRET) as MyToken
        req.user = {patientId, name}  

        if(!patientId){
            throw new UnauthenticatedError('Not authorized to access this route')
        }else{
            next()
        }
    }else{
        throw new UnauthenticatedError('You are not signed in')
    }

    
}

export default patientAuthMiddleware