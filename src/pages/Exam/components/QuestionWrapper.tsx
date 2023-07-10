import { useExamContext } from "../../../context/exam/examContext"
import CBQQUestion from "./question/CBQQuestion"
import ECQQuestion from "./question/ECQQuestion"
import SBAQuestion from "./question/SBAQuestion"
import ExamInfo from "./ExamInfo"
import QuestionReview from "./ReviewQuestion"
import ReferenceRanges from "./constants/ReferenceRanges"

const ShowQuestion = () => {
	const { canAnswer, currQuestion, loading } = useExamContext()

	if (loading || !currQuestion)
		return (
			<aside className='grid grid-cols-1 lg:grid-cols-6 gap-6 animate-pulse'>
				<div className='bg-slate-900/80 rounded-md border border-gray-100/10 shadow-md lg:col-span-4 justify-self-center mx-auto py-6 px-5 sm:p-8 overflow-x-auto w-full h-[500px]' />

				<div className='lg:col-span-2'>
					<div className='border border-blue-100/20 bg-slate-900/80 text-blue-100 rounded-md shadow-md mb-6 font-medium flex items-center gap-2 justify-center py-3 px-5 text-base w-full h-[60px]' />
					<div className='py-6 px-5 sm:p-5 bg-slate-900/80 rounded-md border border-gray-100/10 shadow-md mb-6 h-[200px]' />

					<div className='lg:col-span-2 py-6 px-5 sm:p-5 bg-slate-900/80 rounded-md border border-gray-100/10 shadow-md h-[130px]' />
				</div>
			</aside>
		)

	const switchQuestion = () => {
		switch (currQuestion.type) {
			case "SBA":
				return <SBAQuestion question={currQuestion} />
			case "CBQ":
				return <CBQQUestion question={currQuestion} />
			case "ECQ":
				return <ECQQuestion question={currQuestion} />
		}
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
			<div className='bg-slate-900/80 rounded-md border border-gray-100/10 shadow-md lg:col-span-4 max-w-[300px] min-[400px]:max-w-[350px] min-[500px]:max-w-[400px] sm:max-w-[550px] justify-self-center mx-auto py-6 px-5 sm:p-8 overflow-x-auto h-fit'>
				{switchQuestion()}
			</div>
			<aside className='min-[400px]:max-lg:w-[300px] max-lg:max-w-[300px] max-lg:mx-auto lg:col-span-2'>
				<ReferenceRanges />
				<ExamInfo />
				{canAnswer && <QuestionReview />}
			</aside>
		</div>
	)
}
export default ShowQuestion
