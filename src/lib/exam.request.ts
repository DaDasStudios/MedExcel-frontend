import axios from "axios"
import { FilterSetExamType, IAnsweredQuestionResponse, IQuestion } from "../interface/exam"
import { IScoresHistory } from "../interface/user"
import { REST_HOST } from "./env"

export const getQuestionNoContentRequest = (token: string) => axios.get<{
    questions: IQuestion[]
}>(`${REST_HOST}/question`, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
})

export const setExamRequest = (payload: {
    categories: string[],
    filter: FilterSetExamType
}, token: string) => axios.post<{
    message: string,
    questions: string[]
}>(`${REST_HOST}/exam/set`, payload, {
    headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
    }
})

export const getCurrentQuestionRequest = (token: string) => axios.get<{
    question: IQuestion
    message?: string
    status?: string
    record: IScoresHistory
}>(`${REST_HOST}/exam/current`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const submitAnswerRequest = (payload: {
    answer?: string
    answers?: string[]
}, token: string) => axios.post<IAnsweredQuestionResponse>(`${REST_HOST}/exam/answer`, payload, {
    headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
    }
})

export const cancelExamRequest = (token: string) => axios.delete<{
    message: string
}>(`${REST_HOST}/exam/cancel`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})