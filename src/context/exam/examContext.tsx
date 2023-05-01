import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react"
import {
	ExamMode,
	IAnsweredQuestionResponse,
	ICBQQuestion,
	IExamContext,
	IQuestion,
} from "../../interface/exam"
import { IScoresHistory } from "../../interface/user"
import { getCurrentQuestionRequest } from "../../lib/exam.request"
import { useAuthContext } from "../auth/authContext"
import toast from "react-hot-toast"
import DecitionToast from "../../components/ui/DecitionToast"

const ExamContext = createContext({} as IExamContext)

export const useExamContext = () => useContext(ExamContext)

export const ExamContextProvider = ({ children }: PropsWithChildren) => {
	const { auth } = useAuthContext()
	const { user } = auth

	const [currentQuestion, setCurrentQuestion] = useState({} as IQuestion)
	const [questionResponse, setQuestionResponse] = useState(
		{} as IAnsweredQuestionResponse
	)
	const [score, setScore] = useState(user?.exam.score as number)
	const [hasAnswered, setHasAnswered] = useState(false)
	const [hasFinished, setHasFinished] = useState(false)
	const [scoresHistory, setScoresHistory] = useState({} as IScoresHistory)

	const [mode, setMode] = useState<ExamMode>("LIVE")
	const [questionsAfterCancelling, setQuestionsAfterCancelling] = useState<
		IQuestion[] | undefined
	>()
	const [questionNumber, setQuestionNumber] = useState(-1)

	useEffect(() => {
		setScore(user?.exam.score as number)
	}, [user?.exam.score])

	async function getCurrentQuestion() {
		try {
			const { data } = await getCurrentQuestionRequest(auth.token || "")
			setCurrentQuestion(data.question)
		} catch (error: any) {
			if (
				error.response.status === 401 &&
				error.response.data.message === "Exam not started yet"
			) {
				//window.location.reload()
			}
			//toast.error("Could not get the current question")
		}
	}

	function useCurrentQuestion<T>(){
		return currentQuestion as IQuestion<T>;
	}

	const advanceNextQuestionAfterCancelling = (
		questionsAfterCancellingInit?: IQuestion[]
	) => {
		let questions = questionsAfterCancelling
		if (questionsAfterCancellingInit) {
			setQuestionsAfterCancelling(questionsAfterCancellingInit)
			questions = questionsAfterCancellingInit
		}

		if (!questions) return

		if (questionNumber < questions.length - 1) {
			const currIncorrectQuesion: IQuestion =
				questions[questionNumber + 1]
			console.log("Current question: ", currIncorrectQuesion)

			switch (currIncorrectQuesion.type) {
				case "SBA":
					setQuestionResponse({
						question: currIncorrectQuesion,
						explanation: currIncorrectQuesion.content.explanation,
						score,
						status: "INCORRECT",
					})
					break

				default:
					setQuestionResponse({
						question: currIncorrectQuesion,
						explanation: (
							currIncorrectQuesion as IQuestion<ICBQQuestion>
						).content.map(q => q.explanation),
						score,
						status: "INCORRECT",
					})
					break
			}

			setQuestionNumber(n => n + 1)
			setCurrentQuestion(currIncorrectQuesion)
			setHasAnswered(true)
		} else {
			toast.custom(t => (
				<DecitionToast
					text='Sure you want to leave?'
					t={t}
					afirmativeCallback={() => {
						window.location.reload()
					}}
				/>
			))
		}
	}

	function resetQuestionResponse() {
		setQuestionResponse({} as IAnsweredQuestionResponse)
	}

	return (
		<ExamContext.Provider
			value={{
				currentQuestion,
				setCurrentQuestion,
				questionResponse,
				resetQuestionResponse,
				setQuestionResponse,
				score,
				setScore,
				hasAnswered,
				setHasAnswered,
				getCurrentQuestion,
				hasFinished,
				setHasFinished,
				scoresHistory,
				setScoresHistory,
				mode,
				setMode,
				questionsAfterCancelling,
				setQuestionsAfterCancelling,
				questionNumber,
				setQuestionNumber,
				advanceNextQuestionAfterCancelling,
				useCurrentQuestion
			}}
		>
			{children}
		</ExamContext.Provider>
	)
}
