import axios from 'axios'
import { IUser } from '../interface/user'
import { REST_HOST } from './env'

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