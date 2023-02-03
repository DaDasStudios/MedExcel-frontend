import axios from 'axios'
import { ISite } from '../interface'
import { REST_HOST } from './env'

export const getSiteData = () => axios.get<ISite>(`${REST_HOST}/site`)

export const requestForPayment = (planId: string) => axios.post(`${REST_HOST}/payments/create-order/${planId}`) 