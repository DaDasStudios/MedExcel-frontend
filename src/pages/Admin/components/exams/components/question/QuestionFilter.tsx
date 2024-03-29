import { useState } from "react"
import toast from "react-hot-toast"
import { useAdminContext } from "../../../../../../context/admin/adminContext"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import { QuestionType } from "../../../../../../interface/exam"
import { getQuestionsFiltered } from "../../../../../../lib/admin.request"
import { questionCategories } from "../../../../../../utils/question"
import { toTitle } from "../../../../../../utils/string"

interface IFilterCheckboxProps {
	label: string
	id: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	checked: boolean
}

const FilterCheckbox = ({
	id,
	label,
	onChange,
	checked,
}: IFilterCheckboxProps) => {
	return (
		<label className='text-gray-300 flex items-center gap-2' htmlFor={id}>
			<input
				className='w-4 h-4 bg-black text-blue-500 border-gray-600 rounded focus:ring-blue-600 focus:ring-2'
				type='checkbox'
				checked={checked}
				onChange={onChange}
				name={id}
				id={id}
			/>
			<p>{label}</p>
		</label>
	)
}

const QuestionFilter = () => {
	const { setQuestions, questions } = useExamsAdminContext()
	const { auth } = useAdminContext()
	const [type, setType] = useState({
		SBA: true,
		CBQ: true,
		ECQ: true,
	} as Record<QuestionType, boolean>)
	const [categoryString, setCategoryString] = useState("")
	const [topicString, setTopicString] = useState("")
	const [orderByLatest, setorderByLatest] = useState(false)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setorderByLatest(false)
		try {
			if (Object.values(type).every(v => !v)) {
				return toast.error("Must provide at least one type of question")
			} else {
				const types = []
				for (const eachType of Object.entries(type)) {
					if (eachType[1]) types.push(eachType[0])
				}
				const categories = categoryString
					.replace(" ", "")
					.split(",")
					.map(s => toTitle(s))
				for (const category of categories) {
					if (!questionCategories.includes(category) && category) {
						return toast.error(
							"Some of the provided categories don't exist"
						)
					}
				}

				const topics = topicString
					.replace(" ", "")
					.split(",")
					.map(s => toTitle(s))

				const res = await getQuestionsFiltered(
					{
						type: types,
						category:
							!categories[0] && categories.length === 1
								? null
								: categories,
						topic:
							!topics[0] && topics.length === 1 ? null : topics,
					},
					auth.token
				)

				if (res.status === 200) {
					if (res.data.questions.length === 0) {
						return toast.error(
							"There are no questions with the specified filters"
						)
					}
					return setQuestions(res.data.questions)
				}

				throw new Error("Unknown error")
			}
		} catch (error: any) {
			toast.error("Failed to get questions... Try later")
		}
	}

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setType({ ...type, [e.target.name]: e.target.checked })

	function toggleOrderQuestionsByDate() {
		setQuestions(prevQuestions => {
			return [...prevQuestions].reverse()
		})
	}

	return (
		<div className='mb-6 mt-4'>
			<form onSubmit={onSubmit}>
				<div className='flex items-center justify-between mb-4'>
					<h4 className='text-gray-200 font-medium'>
						There're {questions.length} questions in Medexcel
					</h4>
					<div className='flex items-center gap-x-3 justify-around'>
						<p>Order by:</p>
						<button
							type='button'
							className={`py-1.5 px-3 rounded-md shadow-md border border-blue-200/50 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100 outline-none flex gap-x-2 items-center`}
							onClick={() => {
								setorderByLatest(value => !value)
								toggleOrderQuestionsByDate()
							}}
						>
							{orderByLatest ? (
								<svg
									className='w-5'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M4.5 15.75l7.5-7.5 7.5 7.5'
									/>
								</svg>
							) : (
								<svg
									className='w-5'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M19.5 8.25l-7.5 7.5-7.5-7.5'
									/>
								</svg>
							)}

							<p>{orderByLatest ? "Latest" : "Oldest"} </p>
						</button>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<div className='tracking-tight border-2 border-gray-100/10 rounded-md px-4'>
						<label className='' htmlFor='categories'>
							Categories:
						</label>
						<input
							id='categories'
							className='py-2 outline-none ml-4 bg-transparent'
							placeholder='Separated by commas, ex: Dermatology, Cardiology'
							type='text'
							value={categoryString}
							onChange={e => setCategoryString(e.target.value)}
						/>
					</div>
					<div className='tracking-tight border-2 border-gray-100/10 rounded-md px-4'>
						<label className='' htmlFor='categories'>
							Topics:
						</label>
						<input
							id='topic'
							className='py-2 outline-none ml-4 bg-transparent'
							placeholder='Type the topic properly, support to several topics'
							type='text'
							onChange={e => setTopicString(e.target.value)}
						/>
					</div>
					<div className='flex gap-4'>
						<FilterCheckbox
							id='SBA'
							label='SBA'
							onChange={handleOnChange}
							checked={type.SBA}
						/>
						<FilterCheckbox
							id='ECQ'
							label='ECQ'
							onChange={handleOnChange}
							checked={type.ECQ}
						/>
						<FilterCheckbox
							id='CBQ'
							label='CBQ'
							onChange={handleOnChange}
							checked={type.CBQ}
						/>
						<button
							className='py-1.5 px-3 rounded-md shadow-md border border-blue-200/50 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100 outline-none'
							type='submit'
						>
							Apply
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
export default QuestionFilter
