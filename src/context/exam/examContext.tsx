import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react"
import {
	IAnswerResponse,
	IAnswer,
	IExamContext,
	IQuestion,
	AnswerSBA,
	AnswerCBQ,
	AnswerECQ,
} from "../../interface/exam"
import { cancelExamRequest, getExamQuestion, submitAnswerRequest, terminateExamRequest } from "../../lib/exam.request"
import { useAuthContext } from "../auth/authContext"
import toast from "react-hot-toast"
import useExpiredPlanToast from "../../pages/Exam/hooks/useExpiredPlanToast"
import { rateAnswer } from "../../utils/question"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import DecitionToast from "../../components/toast/DecitionToast"
import { useNavigate } from "react-router-dom"

const ExamContext = createContext({} as IExamContext)

export const useExamContext = () => useContext(ExamContext)

export const ExamContextProvider = ({ children }: PropsWithChildren) => {
	const { auth, refreshUser } = useAuthContext()
	const { user } = auth
	const navigate = useNavigate()

	if (!user) {
		throw new Error("Not authenticated")
	}

	const amount = user.exam.questions.length
	const [currQuestion, setCurrQuestion] = useState<IQuestion>()
	const [page, setPage] = useState(0)
	const [score, setScore] = useState(user.exam.score)

	const [loading, setLoading] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	const [validatedAnswers, setValidatedAnswers, deleteValidatedAnswers] = useLocalStorage<IAnswerResponse[]>(
		new Array(amount).fill(""),
		"validatedAnswers",
		[parsed => parsed.length !== 0]
	)

	const [answersRecords, setAnswersRecords, deleteAnswersRecords] = useLocalStorage<IAnswer[]>(
		new Array(amount).fill(false),
		"answersRecords",
		[parsed => parsed.length !== 0]
	)

	const lastPage = useRef(0)
	const canAnswer = !answersRecords[page]

	useEffect(() => {
		if (user.exam.current === user.exam.questions.length && user.exam.current > 0) {
			setPage(user.exam.questions.length - 1)
		} else setPage(user.exam.current)
	}, [user.exam.current])

	useEffect(() => {
		;(async () => {
			setLoading(true)
			try {
				const { data } = await getExamQuestion(auth.token || "", page)
				setCurrQuestion(data.question)
				lastPage.current = data.current
			} catch (error: any) {
				if (error.response.data.status === "RESOURCE_UNAUTHORIZED") {
					return toast.error(error.response.data.message)
				}
				if (error.response.status === 401 && error.response.data.message === "Exam not started yet") {
					return toast.error(error.response.data.message)
				}

				toast.error("Could not get the current question")
				throw new Error("Could not get the current question")
			} finally {
				setLoading(false)
			}
		})()
	}, [page])

	useEffect(() => {
		setScore(user.exam.score)
	}, [user.exam.score])

	return (
		<ExamContext.Provider
			value={{
				amount,
				score,
				loading,
				submitting,
				page,
				lastPage: lastPage.current,
				canAnswer,
				currQuestion,
				answersRecords,
				validatedAnswers,
				handleNavigation(step, to) {
					if (step) {
						setPage(p => {
							const newPage = p + step

							if (canAnswer && newPage > lastPage.current) return p

							if (newPage < 0 || newPage > amount - 1) return p

							return newPage
						})
					}

					if (to !== undefined && to <= lastPage.current) {
						setPage(to)
					}
				},
				async submitAnswer(answer) {
					setSubmitting(true)

					try {
						switch (currQuestion?.type) {
							case "SBA": {
								const { data } = await submitAnswerRequest(
									{ answer: answer as AnswerSBA },
									auth.token || ""
								)

								setCurrQuestion(data.question)
								setAnswersRecords(prev => prev.map((q, i) => (i === page ? answer : q)))
								setValidatedAnswers(prev =>
									prev.map((v, i) => (i === page ? rateAnswer(data.question, answer) : v))
								)
								setScore(data.score)
								lastPage.current = data.current

								if (data.status === "CORRECT") {
									return toast.success("Correct answer")
								}
								if (data.status === "INCORRECT") {
									return toast.error("Incorrect answer")
								}

								break
							}
							case "CBQ": {
								const { data } = await submitAnswerRequest(
									{ answers: answer as AnswerCBQ },
									auth.token || ""
								)

								setCurrQuestion(data.question)
								setAnswersRecords(prev => prev.map((q, i) => (i === page ? answer : q)))
								setValidatedAnswers(prev =>
									prev.map((v, i) => (i === page ? rateAnswer(data.question, answer) : v))
								)
								setScore(data.score)
								lastPage.current = data.current

								if (data.status === "CORRECT") {
									return toast.success("Correct answers")
								}
								if (data.status === "INCORRECT" || data.status === "NOT ALL CORRECT") {
									return toast.error("Incorrect answers")
								}
								break
							}
							case "ECQ": {
								const { data } = await submitAnswerRequest(
									{ answers: answer as AnswerECQ },
									auth.token || ""
								)

								setCurrQuestion(data.question)
								setAnswersRecords(prev => prev.map((q, i) => (i === page ? answer : q)))
								setValidatedAnswers(prev =>
									prev.map((v, i) => (i === page ? rateAnswer(data.question, answer) : v))
								)
								setScore(data.score)
								lastPage.current = data.current

								if (data.status === "CORRECT") {
									return toast.success("Correct answers")
								}
								if (data.status === "INCORRECT" || data.status === "NOT ALL CORRECT") {
									return toast.error("Incorrect answers")
								}
								break
							}
						}
					} catch (error: any) {
						if (error.response.status === 401) {
							this.terminateExam()
							return useExpiredPlanToast()
						}

						toast.error("Something went wrong when submitting the answer")
					} finally {
						setSubmitting(false)
					}
				},
				async cancelExam() {
					toast.custom(t => (
						<DecitionToast
							t={t}
							text='Are you sure you want to cancel this exam? Please review your answers before accepting'
							textClassName='max-w-[400px] text-center'
							afirmativeCallback={async () => {
								try {
									const { data } = await cancelExamRequest(auth.token || "")

									if (data.statusCode === 204) {
										deleteValidatedAnswers()
										deleteAnswersRecords()
										await refreshUser()
										navigate("/account")
									}
								} catch (error) {
									toast.error("Couldn't cancel exam", {
										id: t.id,
									})
								}
							}}
						/>
					))
				},
				terminateExam() {
					toast.custom(t => (
						<DecitionToast
							t={t}
							text='Are you sure you want to finish this exam?'
							afirmativeCallback={async () => {
								try {
									const { data } = await terminateExamRequest(auth.token || "")

									if (data.status === "FINISHED") {
										deleteValidatedAnswers()
										deleteAnswersRecords()
										await refreshUser()
										navigate("/exam/finish")
									}
								} catch (error) {
									toast.error("Couldn't finish exam", {
										id: t.id,
									})
								}
							}}
						/>
					))
				},
			}}
		>
			{children}
		</ExamContext.Provider>
	)
}
