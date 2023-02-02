import { ISite } from "../../interface";

export enum SiteTypes {
    SET = "SET"
}

interface ICountAction  {
    type: SiteTypes
    payload: ISite
}

export const siteReducer = (state: ISite, action: ICountAction): ISite => {
    action.payload.subscriptionPlans.push({
        _id: 'free-subscription-plan-id',
        name: "Free",
        days: 14,
        price: 0,
        description:
            "Free trial for two weeks, just you need to sign up then ready to start exams",
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    switch (action.type) {
        case SiteTypes.SET:
            return {
                ...state,
                ...action.payload,
                subscriptionPlans: action.payload.subscriptionPlans.sort((a, b) => a.price - b.price),
            }
    
        default:
            throw new Error("Unhandled action type: " + action.type)
    }
}