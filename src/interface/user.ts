
export interface IScoresHistory {
    startedAt: Date
    finishedAt: Date
    questions: string[]
    score: number
}

export interface IUser {
    _id: string
    username: string
    email: string
    password: string
    subscription?: {
        hasSubscription: boolean
        access: Date
        purchaseDate: Date
    }
    exam: {
        startedAt: Date
        correctAnswers: string[]
        current: number
        questions: string[]
        score: number
        scoresHistory: IScoresHistory[]
    }
    token?: string
    payment_id?: string
    payment_token?: string
    role: string
    createdAt: Date
    updatedAt: Date
}