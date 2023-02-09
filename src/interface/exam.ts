
export type QuestionType = "SBA" | "ECQ" | "CBQ" 

export type ICBQQuestion = ISBAQuestion[]

export interface IECQQuestion {
    options: string[]
    question: Array<{
        question: string
        answer: number
    }>
    explanation: string
}

export interface ISBAQuestion {
    options: string[];
    question: string
    answer: number
    explanation: string
}

export interface IQuestion<T = any> {
    _id: string
    type: QuestionType
    scenario: string
    content: T
    category: string
    subcategory?: string
    createdAt: string
    updatedAt: string
}
