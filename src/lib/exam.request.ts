import axios from "axios"
import { FilterSetExamType, IQuestion } from "../interface/exam"
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