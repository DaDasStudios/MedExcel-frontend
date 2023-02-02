import { ISite } from "../../interface";

export enum SiteTypes {
    SET = "SET"
}

interface ICountAction  {
    type: SiteTypes
    payload: ISite
}

export const siteReducer = (state: ISite, action: ICountAction): ISite => {
    switch (action.type) {
        case SiteTypes.SET:
            return {
                ...state,
                ...action.payload
            }
    
        default:
            throw new Error("Unhandled action type: " + action.type)
    }
}