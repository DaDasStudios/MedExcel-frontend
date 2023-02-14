import { ICBQQuestion, IECQQuestion, IMDString, IQuestion, ISBAQuestion, QuestionType } from "./exam";
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
    previewModal: {
        question: IQuestion
        rendered: boolean
        closeModal: () => void
        openModal: (question: IQuestion) => void
    }
    questionForm: {
        markdownContent: string
        setMarkdownContent: React.Dispatch<React.SetStateAction<string>>

        generalQuestionContent: {
            type: QuestionType
            category: string
            scenario: string
            parent: string
        }
        setGeneralQuestionContent: React.Dispatch<React.SetStateAction<{
            type: QuestionType
            category: string
            scenario: string
            parent: string
        }>>
        isEditing: boolean
        setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
        editId: string
        setEditId: React.Dispatch<React.SetStateAction<string>>

        SBAContent: ISBAQuestion
        setSBAContent: React.Dispatch<React.SetStateAction<ISBAQuestion>>
        resetSBAContent: () => void

        ECQContent: IECQQuestion
        setECQContent: React.Dispatch<React.SetStateAction<IECQQuestion>>
        resetECQContent: () => void

        CBQContent: ICBQQuestion
        setCBQContent: React.Dispatch<React.SetStateAction<ICBQQuestion>>
        resetCBQContent: () => void
    }
}

export interface IQuestionFormState {
    type: QuestionType
    category: string
    scenario: IMDString
    parent: string
}