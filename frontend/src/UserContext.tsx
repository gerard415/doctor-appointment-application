import {createContext, useEffect, useState} from 'react'
import { UserProps, patientStateProps, doctorStateProps, userStateProps } from './types'
import axios from 'axios'

export const UserContext: React.Context<UserProps>  = createContext({} as UserProps)

type UserContextProviderProps = {
    children: React.ReactNode
}

const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [user, setUser] = useState<userStateProps | null>(null)
    const [ready, setReady] = useState(false)
    const [redirect,setRedirect] = useState<boolean>(false);


    useEffect(() => {
        if(!user){
            axios.get('/auth/user').then(({data}) => {
                setUser(data)
                setReady(true)
            }).catch((err) => err)
        }
    })

    return (
        <UserContext.Provider value={{user, setUser, ready, redirect, setRedirect}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider