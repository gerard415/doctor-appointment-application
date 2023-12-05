export type UserProps = {
    user: patientStateProps | doctorStateProps | null,
    setUser: React.Dispatch<React.SetStateAction<patientStateProps | doctorStateProps | userStateProps | null>>,
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
    email: string,
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
}