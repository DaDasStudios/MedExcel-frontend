import { FormEvent, useEffect, useState } from "react"
import Separator from "../../../components/ui/Separator"
import { useAuthContext } from "../../../context/auth/authContext"
import { IQuestion } from "../../../interface/exam"
import { getQuestionNoContentRequest } from "../../../lib/exam.request"
import { questionCategories } from "../../../utils/question"
import { toTitle } from "../../../utils/string"

interface ICategoryCheckbosProps {
	category: string
	id?: string | number
}
function CategoryCheckbox({ category, id }: ICategoryCheckbosProps) {
	const [checked, setChecked] = useState(false)
	return (
		<label className='flex gap-2 items-center' htmlFor={category + id}>
			<input
				className='hidden w-3.5 h-3.5 rounded-sm appearance-none border border-gray-100/10 bg-slate-200 focus:outline-offset-2 focus:outline focus:outline-2 focus:outline-slate-400 checked:bg-blue-600 p-1.5'
				checked={checked}
				onChange={e => {
					setChecked(e.target.checked)
				}}
				type='checkbox'
				name={category + id}
				id={category + id}
			/>
			<span
				className={`rounded-sm w-4 h-4 overflow-hidden flex items-center justify-center ${
					!checked && "bg-slate-200"
				}`}>
				{checked && (
					<svg
						className='w-5 bg-blue-600'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
						/>
					</svg>
				)}
			</span>
			<span className='group-focus:block hidden'>asd</span>
			{toTitle(category)}
		</label>
	)
}

const GetExam = () => {
	const { auth } = useAuthContext()
	const [questions, setQuestions] = useState([] as IQuestion[])
	const [categories, setCategories] = useState([])
	const [totalQuestions, setTotalQuestions] = useState(0)

	async function fetchCategories() {
		const res = await getQuestionNoContentRequest(auth.token || "")
		if (res.status === 200 && res.data.questions) {
			setQuestions(res.data.questions)
		}
	}

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	return (
		<div className='tracking-tight text-slate-200 bg-slate-900/50 p-8 rounded-md border border-slate-100/10 shadow-md flex flex-col font-medium'>
			<h3 className='mb-4 text-4xl font-bold text-center'>
				Start Excel-ing at Exams!
			</h3>
			<p className='text-slate-400 mb-4 text-lg'>
				Select the categories you want to be asked, and you'll get
				started with this amazing process. Don't forget you cannot start
				two exams at once.
			</p>
			<Separator />
			<div className='mt-4 rounded-md border border-gray-100/10 '>
				<form onSubmit={onSubmit}>
					<h4 className='text-slate-300 text-xl py-2 px-5 border-b border-gray-100/10 bg-slate-800/50'>
						Categories
					</h4>
					<div>
						<div className='px-4 flex items-center justify-between py-2 border-b border-gray-100/10'>
							<CategoryCheckbox category='All' />
							<p className='pr-4 text-slate-400 text-sm'>
								Attemped{" "}
								<span className='font-semibold'>
									{auth.user?.exam.correctAnswers.length}
								</span>{" "}
								of {questions.length}
							</p>
						</div>
						<ul className='flex flex-col'>
							{questionCategories.map((category, i) => (
								<li
									className='flex items-center pl-6 py-2 justify-between border-b border-gray-100/10 last:border-transparent'
									key={category + i}>
									<CategoryCheckbox
										category={category}
										id={i}
									/>
								</li>
							))}
						</ul>
					</div>
				</form>
			</div>
		</div>
	)
}
export default GetExam
