import { ISiteInformation } from "../../interface";

export enum SiteTypes {
    SET = "SET"
}

interface ICountAction  {
    type: SiteTypes
    payload: ISiteInformation
}

export const siteReducer = (state: ISiteInformation, action: ICountAction): ISiteInformation => {
    switch (action.type) {
        case SiteTypes.SET:
            return {
                ...state,
                ...action.payload,
            }
    
        default:
            throw new Error("Unhandled action type: " + action.type)
    }
}