import axios from 'axios'
import { ISiteInformation } from '../interface'
import { REST_HOST } from './env'

export const getSiteData = () => axios.get<ISiteInformation>(`${REST_HOST}/site`)

export const requestForPayment = (planId: string, token: string) => axios.post<
    {
        message: string,
        order: {
            status: string,
            links: {
                href: string
                rel: string
                method: string
            }[]
        }
    }
>(`${REST_HOST}/payments/create-order/${planId}`, {}, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}) 