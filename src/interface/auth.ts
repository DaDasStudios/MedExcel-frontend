import { IUser } from "./user";



export interface IAuth {
    token?: string
    id?: string
    user: IUser | null
}