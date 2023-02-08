import axios from 'axios'
import { ISubscriptionPlan } from '../interface'
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

export const uploadSiteImageRequest = (form: FormData, adminToken: string) => axios.put<{
    message: string,
    image: {
        id: string
        url: string
        secureUrl: string
    }
}>(`${REST_HOST}/site/image`, form, {
    headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': `Bearer ${adminToken}`
    }
})

export const addSubscriptionPlanRequest = (payload: {
    name: string,
    description: string,
    days: number,
    price: number
}, adminToken: string) => axios.post<{
    message: string
    subscriptionPlans: ISubscriptionPlan[]
}>(`${REST_HOST}/site/subscription`, payload, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
    }
})

export const updateSubscriptionPlanRequest = (id: string, payload: {
    name: string,
    description: string,
    days: number,
    price: number
}, adminToken: string) => axios.put<{
    message: string
    subscriptionPlans: ISubscriptionPlan[]
}>(`${REST_HOST}/site/subscription/${id}`, payload, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
    }
})


export const deleteSubscriptionPlanRequest = (subscriptionId: string, adminToken: string) => axios.delete<{
    message: string,
    subscription: ISubscriptionPlan 
}>(`${REST_HOST}/site/subscription/${subscriptionId}`, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
    }
})