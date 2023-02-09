import { useEffect } from "react"
import { toast } from "react-hot-toast"
import Spin from "../../../../../components/ui/Spin"
import { useAdminContext } from "../../../../../context/admin/adminContext"
import { useExamsAdminContext } from "../../../../../context/admin/examsContext"
import { getAllQuestionsRequest } from "../../../../../lib/admin.request"
import QuestionCard from "./QuestionCard"

const QuestionsGroup = () => {
	const { setQuestions, questions} = useExamsAdminContext()
	const { auth } = useAdminContext()

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllQuestionsRequest(auth.token)
				setQuestions(data.questions)
			} catch (error: any) {
				toast.error("Could not fecth the questions... Try later")
			}
			
		})()
	}, [])

	if (questions.length === 0) return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<Spin/>
			<p className="text-gray-400 text-xl">Loading MedExcel questions...</p>
		</div>
	)
	else return (
		<div className="grid grid-cols-4 gap-4 items-baseline">
			{questions.map((question, index) => <QuestionCard key={question._id} index={index} question={question}/>)}
		</div>
	)
}
export default QuestionsGroup
