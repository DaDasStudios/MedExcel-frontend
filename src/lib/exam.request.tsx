import axios from "axios"
import { IQuestion } from "../interface/exam"
import { REST_HOST } from "./env"

export const getQuestionNoContentRequest = (token: string) => axios.get<{
    questions: IQuestion[]
}>(`${REST_HOST}/question`, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
})