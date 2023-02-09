import { IQuestion } from "./exam";
import React from "react";

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

export interface IExamsAdminContext {
    questions: IQuestion[]
    setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>
    visualizerModal: {
        isVisualizerOpen: boolean
        closeModal: () => void
        openModal: (content: string) => void
        content: string
    }

}