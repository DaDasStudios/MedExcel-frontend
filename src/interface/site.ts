import { ReactNode } from "react"


export interface ISubscriptionPlan {
    createdAt: Date
    updatedAt: Date
    _id: string
    name: string
    description: string
    days: number
    price: number
}

export interface ISiteInformation {
    image: {
        url: string
    }
    name: string
    subscriptionPlans: ISubscriptionPlan[]
}

export interface ISite {
    modal: {
        isOpen: boolean
        close: () => void
        open: (children: JSX.Element) => void
        children: JSX.Element
    }
}