import { ISignIn } from "../lib/auth.request";

export type setAdminDataType = (payload: { token: string; id: string }) => Promise<boolean>;

export interface IAdminContext {
    auth: IAdminState
    setAdminData: setAdminDataType
    reset: () => void
}

export interface IAdminUser {
    _id: string;
    username: string;
    email: string;
    password: null,
    role: "Admin",
    createdAt: Date,
    updatedAt: Date
    token: string

}

export interface IAdminState {
    token: string;
    id: string;
    user: IAdminUser | null
}