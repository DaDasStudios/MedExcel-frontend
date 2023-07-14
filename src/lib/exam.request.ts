import axios from "axios"
import {
	AnswerCBQ,
	AnswerECQ,
	AnswerSBA,
	FilterSetExamType,
	IAnsweredQuestionResponse,
	IQuestion,
	QuestionType,
} from "../interface/exam"
import { IScoresHistory } from "../interface/user"
import { REST_HOST } from "./env"

export const getQuestionNoContentRequest = (token: string) =>
	axios.get<{
		questions: IQuestion[]
	}>(`${REST_HOST}/question`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

export const setExamRequest = (
	payload: {
		categories: string[]
		filter: FilterSetExamType
		type?: QuestionType
		ids?: string[]
	},
	token: string
) =>
	axios.post<{
		message: string
		questions: string[]
	}>(`${REST_HOST}/exam/set`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})

export const getExamQuestion = (token: string, index: number) =>
	axios.get<{
		question: IQuestion
		current: number
		message?: string
		status?: string
		record: IScoresHistory
	}>(`${REST_HOST}/exam/question/${index}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

export const submitAnswerRequest = (
	payload: {
		answer?: AnswerSBA
		answers?: AnswerCBQ | AnswerECQ
	},
	token: string
) =>
	axios.post<IAnsweredQuestionResponse>(`${REST_HOST}/exam/answer`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})

export const cancelExamRequest = (token: string) =>
	axios.delete<{
		message: string
		status: string
		statusCode: number
		incorrectQuestions: IQuestion[]
	}>(`${REST_HOST}/exam/cancel`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

export const terminateExamRequest = (token: string) =>
	axios.post<{
		message: string
		status: string
		record: IScoresHistory
	}>(
		`${REST_HOST}/exam/terminate`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}
	)
