import axios from 'axios'
import { IUser } from '../interface/user'
import { ISignIn } from './auth.request'
import { REST_HOST } from './env'

export const signInAdminRequest = (payload: ISignIn) => axios.post<{
    message: string
    token: string
    id: string
}>(`${REST_HOST}/auth/signin`, payload, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getAllUsersRequest = (adminToken: string) => axios.get<{
    users: IUser[]
}>(`${REST_HOST}/users`, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
    }
})

export const getUsersByFilterRequest = (key: string, value: string, adminToken: string) => axios.get<{
    users: IUser[]
}>(`${REST_HOST}/users?key=${key}&value=${value}`, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
    }
})

export const deleteUserRequest = (id: string, adminToken: string) => axios.delete(`${REST_HOST}/users/user/${id}`, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
    }
})

export const updateUserByAdminRequest = (id: string, username: string, adminToken: string) => axios.put<
    {
        message: string
        user: IUser
    }
>(`${REST_HOST}/users/user/${id}`, { username }, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
    }
})