export type UserProps = {
    user: userStateProps | null,
    setUser: React.Dispatch<React.SetStateAction<userStateProps | null>>,
    ready: boolean,
    redirect: boolean,
    setRedirect: React.Dispatch<React.SetStateAction<boolean>>,
}

export type patientStateProps = {
    name: string,
    email: string,
    id: string,
    phone?: number,
    bloodType?: string
    role: string
}

export type doctorStateProps = {
    name: string,
    email: string
    id: string,
    phone?: number,
    ticketPrice: number,
    specialization?: string,
    qualifications?: [Object],
    experiences?: [Object],
    bio?: string,
    about?: string,
    averageRating?: number,
    totalRatings?: number,
    role: string
}

export type userStateProps = {
    name: string
    email: string
    role: string
    id: string
    bloodtype: string
    phone: number
    photo?: string
    appointments?: [Object] 
}

export type imageProps = {
    fileName: string,
    filePath: string
}