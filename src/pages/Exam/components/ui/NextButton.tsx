import { toast } from "react-hot-toast"
import { useAuthContext } from "../../../../context/auth/authContext"
import { useExamContext } from "../../../../context/exam/examContext"
import { getCurrentQuestionRequest } from "../../../../lib/exam.request"

const NextButton = () => {
	const { auth } = useAuthContext()
	const { setHasFinished, setScoresHistory } = useExamContext()
	async function GoNextQuestion() {
		const res = await getCurrentQuestionRequest(auth?.token || '')
		if (res.data.status && res.data.status === "FINISHED") {
			setHasFinished(true)
			setScoresHistory(res.data.record)
			toast.success("Exam finished!")
		} else {
			window.location.reload()
		}
	}

	return (
		<button
			onClick={GoNextQuestion}
			type='submit'
			className='self-end flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1'>
			<svg
				className='w-5'
				fill='currentColor'
				viewBox='0 0 20 20'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'>
				<path
					clipRule='evenodd'
					fillRule='evenodd'
					d='M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z'
				/>
			</svg>
			Next
		</button>
	)
}
export default NextButton
