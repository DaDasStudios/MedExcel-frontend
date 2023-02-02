import axios from 'axios'

export const getSiteData = () => axios.get('https://medexcel.onrender.com/site')

export const requestForPayment = (planId: string) => axios.post('https://medexcel.onrender.com/payments/create-order/' + planId)