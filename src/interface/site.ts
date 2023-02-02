

export interface ISubscriptionPlan {
    createdAt: Date
    updatedAt: Date
    _id: string
    name: string
    description: string
    days: number
    price: number
}

export interface ISite {
    image: {
        url: string
    }
    name: string
    subscriptionPlans: ISubscriptionPlan[]
}