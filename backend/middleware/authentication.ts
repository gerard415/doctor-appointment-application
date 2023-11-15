import { Request, Response, NextFunction } from "express";
import UnauthenticatedError from "../errors/unauthenticated";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface MyUserRequest extends Request {
    user?: any;
}

type MyToken = {
    userId: number
    name: string
  }

const SECRET: Secret = process.env.JWT_SECRET ?? ''

const authMiddleware = async (req: MyUserRequest, res: Response, next:NextFunction) => {
    const {token} = req.cookies

    try{

        const {userId, name} = jwt.verify(token, SECRET) as MyToken
        req.user = {userId, name}  
        next()
    }
    catch(error){
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export = authMiddleware