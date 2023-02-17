import { useEffect } from "react"
import Spin from "../../../components/ui/Spin"
import { useExamContext } from "../../../context/exam/examContext"
import CBQQUestion from "./CBQQuestion"
import ECQQuestion from "./ECQQuestion"
import SBAQuestion from "./SBAQuestion"
import Sidebar from "./Sidebar"

const ShowQuestion = () => {
	const { currentQuestion, getCurrentQuestion } = useExamContext()

	useEffect(() => {
		getCurrentQuestion()
	}, [])

	return (
		<div className='grid grid-cols-6 gap-6'>
			<div className='bg-slate-900/80 p-8 rounded-md border border-gray-100/10 shadow-md col-span-4'>
				{currentQuestion ? (
					<>
						{currentQuestion.type === "ECQ" && <ECQQuestion />}
						{currentQuestion.type === "SBA" && <SBAQuestion />}
						{currentQuestion.type === "CBQ" && <CBQQUestion />}
					</>
				) : (
					<Spin />
				)}
			</div>
			<Sidebar />
		</div>
	)
}
export default ShowQuestion
