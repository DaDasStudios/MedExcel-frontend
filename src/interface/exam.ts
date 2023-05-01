import { IScoresHistory } from "./user"

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
    topic: string
    content: T
    category: string    
    parent: string
    createdAt: string
    updatedAt: string
}

export type FilterSetExamType = "ALL" | "INCORRECT" | "NEW"

export type AnsweredQuestionStatus = "CORRECT" | "INCORRECT" | "NOT ALL CORRECT"

export type ExamMode = "LIVE" | "CANCELLED"

export interface IAnsweredQuestionResponse {
    score: number
    status: AnsweredQuestionStatus
    explanation: string | string[]
    question: IQuestion
}

export interface IExamContext {
    currentQuestion: IQuestion
    setCurrentQuestion: React.Dispatch<React.SetStateAction<IQuestion>>
    useCurrentQuestion<T>(): IQuestion<T>
    questionResponse: IAnsweredQuestionResponse
    resetQuestionResponse: () => void
    setQuestionResponse: React.Dispatch<React.SetStateAction<IAnsweredQuestionResponse>>
    score: number
    setScore: React.Dispatch<React.SetStateAction<number>>
    hasAnswered: boolean
    setHasAnswered: React.Dispatch<React.SetStateAction<boolean>>
    getCurrentQuestion: () => Promise<void>
    hasFinished: boolean
    scoresHistory: IScoresHistory
    setScoresHistory: React.Dispatch<React.SetStateAction<IScoresHistory>>
    setHasFinished: React.Dispatch<React.SetStateAction<boolean>>
    mode: ExamMode
    setMode: React.Dispatch<React.SetStateAction<ExamMode>>
    questionNumber: number
    setQuestionNumber: React.Dispatch<React.SetStateAction<number>>
    questionsAfterCancelling: IQuestion[] | undefined
    setQuestionsAfterCancelling: React.Dispatch<React.SetStateAction<IQuestion[] | undefined>>
    advanceNextQuestionAfterCancelling: (questionsAfterCancellingInit?: IQuestion[]) => void
}