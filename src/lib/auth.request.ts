import axios from 'axios'

interface ISignUp {
    username: string
    email: string
    password: string
}

export const signUpRequest = (payload: ISignUp) => axios.post<{
    message: string,
}>('https://medexcel.onrender.com/auth/signup', payload, { headers: {
    'Content-Type': 'application/json'
}})