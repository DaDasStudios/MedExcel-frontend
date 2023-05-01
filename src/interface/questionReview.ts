import { ReactElement } from "react-markdown/lib/react-markdown"
import { IUser } from "./user"
import { IQuestion } from "./exam"

/**
 * The question review interface saved in the database
 */
export interface IQuestionReview {
    questionId: string
    authorId: string
    rate: number
    review: string
    createdAt: string
    updatedAt: string
    _id: string
}

/**
 * Question review actions and values of the context for admin
 */
export interface IQuestionReviewsContext {
    reviews: IQuestionReview[]
    setReviews: React.Dispatch<React.SetStateAction<IQuestionReview[]>>
    fetchReviews: () => void
    deleteReview: (id: string) => void
    isModalOpen: boolean
    openModal: (component: ReactElement) => void
    closeModal: () => void
    modalChildren: ReactElement
    fetchUser: (id: string) => void
    user: IUser | undefined | null
    fetchQuestion: (id: string) => void
    question: IQuestion | undefined | null
}