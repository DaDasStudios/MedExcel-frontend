import { CBQContent, ECQContent, SBAContent, MarkdownContent, IQuestion, QuestionType } from "./exam";
import React from "react";
import { IUser } from "./user";

export type setAdminDataType = (payload: { token: string; id: string }) => Promise<boolean>;

export interface IAdminContext {
    auth: IAdminState
    setAdminData: setAdminDataType
    reset: () => void
}

export interface IAdminState {
    token: string;
    id: string;
    user: IUser | null
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
            topic: string
        }
        setGeneralQuestionContent: React.Dispatch<React.SetStateAction<{
            type: QuestionType
            category: string
            scenario: string
            parent: string
            topic: string
        }>>
        isEditing: boolean
        setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
        editId: string
        setEditId: React.Dispatch<React.SetStateAction<string>>

        SBAContent: SBAContent
        setSBAContent: React.Dispatch<React.SetStateAction<SBAContent>>
        resetSBAContent: () => void

        ECQContent: ECQContent
        setECQContent: React.Dispatch<React.SetStateAction<ECQContent>>
        resetECQContent: () => void

        CBQContent: CBQContent
        setCBQContent: React.Dispatch<React.SetStateAction<CBQContent>>
        resetCBQContent: () => void

        formRef: React.MutableRefObject<HTMLFormElement | null>
    }
}

export interface IQuestionFormState {
    type: QuestionType
    category: string
    scenario: MarkdownContent
    parent: string
    topic: string
}