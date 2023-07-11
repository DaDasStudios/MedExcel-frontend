import {
	createContext,
	useContext,
	PropsWithChildren,
	useState,
} from "react"
import {
	IQuestionReview,
	IQuestionReviewsContext,
} from "../../interface/questionReview"
import { useAdminContext } from "./adminContext"
import {
	deleteQuestionReview,
	getQuestionById,
	getQuestionReviews,
	getUsersByFilterRequest,
} from "../../lib/admin.request"
import { toast } from "react-hot-toast"
import { ReactElement } from "react-markdown/lib/react-markdown"
import DecitionToast from "../../components/toast/DecitionToast"
import { IUser } from "../../interface/user"
import { IQuestion } from "../../interface/exam"

const reviewsContext = createContext({} as IQuestionReviewsContext)

export const useQuestionReviewContext = () => useContext(reviewsContext)

export const QuestionReviewContextProvider = ({
	children,
}: PropsWithChildren) => {
	const { auth } = useAdminContext()

	const [reviews, setReviews] = useState<IQuestionReview[]>([])
	const [user, setUser] = useState<IUser | null | undefined>(undefined)
	const [question, setQuestion] = useState<IQuestion | null | undefined>(
		undefined
	)
	const [modalOpen, setModalOpen] = useState(false)
	const [modalChildren, setModalChildren] = useState<ReactElement>(<></>)

	const fetchReviews = async () => {
		try {
			const { data } = await getQuestionReviews(auth.token)
			if (data.status === "CORRECT") {
				setReviews(data.questionReviews)
			}
		} catch (error) {
			toast.error("Couldn't fetch reviews")
		}
	}

	const fetchUser = async (id: string) => {
		try {
			const { data } = await getUsersByFilterRequest(
				"_id",
				id,
				auth.token
			)
			setUser(data.users[0])
		} catch (error) {
			setUser(null)
			toast.error("Couldn't fetch user")
		}
	}

	const fetchQuestion = async (id: string) => {
		try {
			const res = await getQuestionById(auth.token, id)
			if (res.status === 200) {
				setQuestion(res.data.question)
			}
		} catch (error) {
			setQuestion(null)
			toast.error("Couldn't fetch question")
		}
	}

	return (
		<reviewsContext.Provider
			value={{
				reviews,
				setReviews,
				fetchReviews,
				deleteReview(id) {
					toast.custom(t => (
						<DecitionToast
							t={t}
							text='Sure you want to delete this review?'
							afirmativeCallback={async () => {
								try {
									const res = await deleteQuestionReview(
										auth.token,
										id
									)
									if (res.status === 204) {
										setReviews(reviews =>
											reviews.filter(r => r._id !== id)
										)
										toast.success(
											"Review deleted successfully"
										)
									}
								} catch (error) {
									toast.error("Couldn't delete this review")
								}
							}}
						/>
					))
				},
				isModalOpen: modalOpen,
				closeModal() {
					setModalOpen(false)
				},
				openModal(component) {
					setModalOpen(true)
					setModalChildren(component)
				},
				modalChildren,
				user,
				fetchUser,
				question,
				fetchQuestion,

			}}
		>
			{children}
		</reviewsContext.Provider>
	)
}
