import axios from 'axios'
import { REST_HOST } from './env'

interface ISignUp {
    username: string
    email: string
    password: string
}

interface ISignIn {
    email: string
    password: string
}

export const signUpRequest = (payload: ISignUp) => axios.post<{
    message: string,
}>(`${REST_HOST}/auth/signup`, payload, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const signInRequest = (payload: ISignIn) => axios.post<{
    message: string
    token: string
    id: string
}>(`${REST_HOST}/auth/signin`, payload, {
    headers: {
        'Content-Type': 'application/json'
    }
})