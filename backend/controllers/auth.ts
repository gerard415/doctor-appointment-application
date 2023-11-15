import {Request, Response} from 'express'

const register  = async (req:Request, res:Response) => {
    res.send('register')
}

const login  = async (req:Request, res:Response) => {
    res.send('login')
}

const logout  = async (req:Request, res:Response) => {
    res.send('logout')
}

const getProfile  = async (req:Request, res:Response) => {
    res.send('get profile')
}

const editProfile  = async (req:Request, res:Response) => {
    res.send('edit profile')
}

export {register, login, getProfile, editProfile, logout}