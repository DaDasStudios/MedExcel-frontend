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

const ShowQuestion = () => {
	const { currentQuestion, getCurrentQuestion, hasFinished } =
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
		getCurrentQuestion()
		checkUserHasFinished()
	}, [])

	return (
		<div
			className={`${
				hasFinished ? "mx-auto max-w-[650px]" : "grid grid-cols-6 gap-6"
			}`}>
			<div className='bg-slate-900/80 p-8 rounded-md border border-gray-100/10 shadow-md col-span-4'>
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
			{!hasFinished && <Sidebar />}
		</div>
	)
}
export default ShowQuestion
