import axios from 'axios'
import { IStatisticResponse } from '../interface/stats'
import { IUser } from '../interface/user'
import { REST_HOST } from './env'
import { IQuestionReview } from '../interface/questionReview'

export const getUserRequest = (id: string, token: string) => axios.get<{
    user: IUser
}>(`${REST_HOST}/users/user/owner/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const updateUserRequest = (username: string, id: string, token: string) => axios.put(`${REST_HOST}/users/user/owner/${id}`, { username }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const recoverPasswordRequest = (email: string) => axios.put<{ message: string }>(`${REST_HOST}/users/password`, { email }, {
    headers: {
        'Content-Type': "application/json"
    }
})

export const sendNewPasswordRequest = (newPassword: string, recoverToken: string) => axios.put<{
    message: string
    token: string
    id: string
}>(`${REST_HOST}/users/password/${recoverToken}`, { password: newPassword }, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const sendAccountDeletionRequest = (id: string, token: string) => axios.delete<{
    message: string
    status: string
}>(`${REST_HOST}/users/user/owner/delete/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const deleteAccountAuthorized = (token: string) => axios.delete<{
    message: string
    status: string
    statusCode: number
    userDeleted: IUser
}>(`${REST_HOST}/users/user/owner/delete?permissionToken=${token}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})


export const resetExamHistoryRequest = (id: string, token: string) => axios.delete<{
    message: string
}>(`${REST_HOST}/users/user/owner/reset-exam-history/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const resetPerformanceHistoryRequest = (id: string, token: string) => axios.delete<{
    message: string
}>(`${REST_HOST}/users/user/owner/reset-performance-history/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const getGeneralPerformanceRequest = (id: string, token: string) => axios.get<{
    status: string,
    statistics: IStatisticResponse
}>(`${REST_HOST}/users/user/owner/statistics/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const getSpecificPerformanceRequest = (correctQuestionsId: string[], id: string, token: string) => axios.post<{
    status: string,
    statistics: IStatisticResponse
}>(`${REST_HOST}/users/user/owner/statistics/${id}`, {
    correctQuestionsId
}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const postQuestionReview = (questionId: string, token: string, review: string, rate: number) => axios.post<{
    status: string,
    message: string,
    questionReview: IQuestionReview
}>(`${REST_HOST}/question/review`, {
    questionId, review, rate
}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})