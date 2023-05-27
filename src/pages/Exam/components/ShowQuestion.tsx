import { useEffect } from "react"
import Spin from "../../../components/ui/Spin"
import { useAuthContext } from "../../../context/auth/authContext"
import { useExamContext } from "../../../context/exam/examContext"
import { getUserRequest } from "../../../lib/user.request"
import FinishExam from "../FinishExam"
import CBQQUestion from "./question/CBQQuestion"
import ECQQuestion from "./question/ECQQuestion"
import SBAQuestion from "./question/SBAQuestion"
import Sidebar from "./Sidebar"
import QuestionReview from "./QuestionReview"
import ReferenceRanges from "../ReferenceRanges"

const ShowQuestion = () => {
	const { currentQuestion, getCurrentQuestion, hasFinished, mode, questionNumber } =
		useExamContext()
	const { auth } = useAuthContext()

	function checkUserHasFinished() {
		setTimeout(async () => {
			const { data } = await getUserRequest(
				auth.id || "",
				auth?.token || ""
			)
			if (data.user.exam.startedAt === null) {
				window.location.reload()
			}
		}, 2000)
	}

	useEffect(() => {
		switch (mode) {
			case "LIVE":
				getCurrentQuestion()
				checkUserHasFinished()
				break
			default:	
				break
		}
	}, [mode, questionNumber])

	return (
		<div
			className={`${
				hasFinished
					? "mx-auto max-w-[650px]"
					: "grid grid-cols-1 lg:grid-cols-6 gap-6"
			}`}
		>
			<div className='bg-slate-900/80 rounded-md border border-gray-100/10 shadow-md lg:col-span-4 max-w-[300px] min-[400px]:max-w-[350px] min-[500px]:max-w-[400px] sm:max-w-[550px] justify-self-center mx-auto py-6 px-5 sm:p-8 overflow-x-auto'>
				{hasFinished ? (
					<FinishExam />
				) : currentQuestion ? (
					<>
						{currentQuestion.type === "ECQ" && <ECQQuestion />}
						{currentQuestion.type === "SBA" && <SBAQuestion />}
						{currentQuestion.type === "CBQ" && <CBQQUestion />}
					</>
				) : (
					<Spin />
				)}
			</div>
			{!hasFinished && (
				<aside className='min-[400px]:max-lg:w-[300px] max-lg:max-w-[300px] max-lg:mx-auto lg:col-span-2'>
					<ReferenceRanges/>
					<Sidebar />
					{mode === "LIVE" && <QuestionReview />}
				</aside>
			)}
		</div>
	)
}
export default ShowQuestion
