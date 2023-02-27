import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import {
	IAnsweredQuestionResponse,
	IExamContext,
	IQuestion,
} from "../../interface/exam"
import { IScoresHistory } from "../../interface/user"
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
	const [score, setScore] = useState(user?.exam.score as number)
	const [hasAnswered, setHasAnswered] = useState(false)
	const [hasFinished, setHasFinished] = useState(false)
	const [scoresHistory, setScoresHistory] = useState({} as IScoresHistory)

	useEffect(() => {
		setScore(user?.exam.score as number)
	}, [user?.exam.score])

	async function getCurrentQuestion() {
		try {
			const { data } = await getCurrentQuestionRequest(auth.token || "")
			setCurrentQuestion(data.question)
		} catch (error: any) {
			if (error.response.status === 401 && error.response.data.message === "Exam not started yet") {
				//window.location.reload()
			}
			//toast.error("Could not get the current question")
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
				setScoresHistory
			}}>
			{children}
		</ExamContext.Provider>
	)
}
