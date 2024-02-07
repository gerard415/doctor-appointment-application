export type UserProps = {
    user: userStateProps | null,
    setUser: React.Dispatch<React.SetStateAction<userStateProps | null>>,
    ready: boolean,
    redirect: boolean,
    setRedirect: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdateUser: React.Dispatch<React.SetStateAction<boolean>>,
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
    _id: string,
    phone?: number,
    ticketPrice: number,
    specialization?: string,
    qualifications?: qualificationsType[],
    experiences: experienceType[],
    bio?: string,
    about?: string,
    averageRating?: number,
    totalRatings?: number,
    role: string
    isApproved: string
    photo?: string
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
    bio?: string
    gender?: string
    specialization?: string
    ticketPrice: number
    qualifications: qualificationsType[]
    experiences: experienceType[]
    about?: string
    averageRating: number
    totalRatings: number 
    isApproved: string
}

export type imageProps = {
    fileName: string,
    filePath: string
}

export type reviewProps = {
    patientName: string
    patientPhoto?: string
    text: string
    rating: number
    createdAt: string
    _id: string
}

export type qualificationsType = {
    startingDate: string
    endingDate: string
    degree: string
    university: string
}

export type experienceType = {
    startingDate: string
    endingDate: string
    position: string
    hospital: string
}