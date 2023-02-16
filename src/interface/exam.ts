
export type QuestionType = "SBA" | "ECQ" | "CBQ" 

export type ICBQQuestion = ISBAQuestion[]

export type IMDString = string

export interface IECQQuestion {
    options: string[]
    question: Array<{
        question: string
        answer: number
    }>
    explanation: IMDString
}

export interface ISBAQuestion {
    options: string[];
    question: string
    answer: number
    explanation: IMDString
}

export interface IQuestion<T = any> {
    _id: string
    type: QuestionType
    scenario: IMDString
    content: T
    category: string    
    parent: string
    createdAt: string
    updatedAt: string
}

export type FilterSetExamType = "ALL" | "INCORRECT" | "NEW"