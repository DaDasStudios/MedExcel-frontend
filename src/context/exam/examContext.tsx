import { createContext, PropsWithChildren, useContext, useState } from "react"
import toast from "react-hot-toast"
import {
	IAnsweredQuestionResponse,
	IExamContext,
	IQuestion,
} from "../../interface/exam"
import { getCurrentQuestionRequest } from "../../lib/exam.request"
import { useAuthContext } from "../auth/authContext"

const ExamContext = createContext({} as IExamContext)

export const useExamContext = () => useContext(ExamContext)

export const ExamContextProvider = ({ children }: PropsWithChildren) => {
	const { auth } = useAuthContext()
	const { user } = auth

	const [currentQuestion, setCurrentQuestion] = useState({} as IQuestion)
	const [questionResponse, setQuestionResponse] = useState(
		{} as IAnsweredQuestionResponse
	)
	const [score, setScore] = useState(user?.exam.score || 0)
	const [hasAnswered, setHasAnswered] = useState(false)

	async function getCurrentQuestion() {
		try {
			const { data } = await getCurrentQuestionRequest(auth.token || "")
			setCurrentQuestion(data.question)
		} catch (error) {
			toast.error("Could not get the current question")
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
				getCurrentQuestion
			}}>
			{children}
		</ExamContext.Provider>
	)
}
