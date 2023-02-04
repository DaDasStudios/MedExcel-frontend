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