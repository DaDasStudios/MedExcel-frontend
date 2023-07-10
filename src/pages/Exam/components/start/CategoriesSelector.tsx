import { FormEvent, useEffect, useState } from "react"
import { useAuthContext } from "../../../../context/auth/authContext"
import { toast } from "react-hot-toast"
import FilterRadioButton from "./FilterRadioButton"
import CategoryCheckbox from "./CategoryCheckbox"
import SolidButton, { themeBtns } from "../../../../components/ui/Buttons/SolidButton"
import Separator from "../../../../components/ui/Separator"
import Spin from "../../../../components/ui/Spin"
import { ComponentElement } from "../../../../interface"
import { FilterSetExamType, IQuestion } from "../../../../interface/exam"
import { getQuestionNoContentRequest, setExamRequest } from "../../../../lib/exam.request"

interface IQuestionWithCheck {
	checked: boolean
	content: (IQuestion & { checked: boolean })[]
}

const CategoriesSelector = () => {
	const { auth, refreshUser } = useAuthContext()

	const [questions, setQuestions] = useState({} as Record<string, IQuestionWithCheck>)
	const [amountQuestions, setAmountQuestions] = useState(0)
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [checkAll, setCheckAll] = useState(false)
	const [filter, setFilter] = useState("" as FilterSetExamType)

	// ? get all the questions and get all the parent/single categories to save a checkbox state tree with the ones that are checked
	async function fetchCategories() {
		const res = await getQuestionNoContentRequest(auth.token || "")
		if (res.status === 200 && res.data.questions) {
			const tempQuestionsState = {} as Record<string, IQuestionWithCheck>

			setAmountQuestions(res.data.questions.length)
			res.data.questions.forEach(question => {
				let parentKey = ""

				if (question.parent === "All") {
					parentKey = "None"
				} else {
					parentKey = question.parent
				}

				if (!Object.hasOwn(tempQuestionsState, parentKey)) {
					tempQuestionsState[parentKey] = {
						checked: false,
						content: [],
					}
				}

				tempQuestionsState[parentKey].content.push({
					...question,
					checked: false,
				})
			})
			setQuestions(tempQuestionsState)
		}
	}

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		if (!["ALL", "INCORRECT", "NEW"].includes(filter) || selectedCategories.length === 0) {
			return toast.error("Must provide categories and one filter")
		}

		if (!auth.user?.subscription?.hasSubscription) {
			return toast.error("You cannot start an exam without a subscription plan")
		}

		try {
			const res = await setExamRequest(
				{
					categories: selectedCategories,
					filter,
				},
				auth.token || ""
			)

			if (res.status === 200 && res.data.message === "Exam started") {
				await refreshUser()
				return window.location.replace("/exam")
			}

		} catch (error: any) {
			if (error.response.data.message === "You cannot start an exam without finishing the current one") {
				return toast.error("You already have started an exam")
			}

			if (error.response.data.message === "Must get a subscripton plan") {
				return toast.error("Your subscription plan has expired :(")
			}

			if (error.response.data.message === "No questions found with the specified filters") {
				return toast.error(error.response.data.message)
			}

			return toast.error("Something went wrong... Try later")
		}
	}

	// ? Since the parent category is assigned to a checkbox, it's necessary point to the checkbox that is tagged with the same category. Also this function supports multiple categories, in case it's called by a parent-category checkbox
	function handleChecking(value: string | string[], checked: boolean) {
		if (Array.isArray(value)) {
			if (checked) {
				setSelectedCategories([...selectedCategories, ...value])
			} else {
				setSelectedCategories(selectedCategories.filter(category => !value.includes(category)))
			}
		} else {
			if (checked) {
				setSelectedCategories([...selectedCategories, value])
			} else {
				setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== value))
			}
		}
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	return (
		<div className='tracking-tight text-slate-200 bg-slate-900/50 py-6 px-5 sm:p-8 rounded-md border border-slate-100/10 shadow-md flex flex-col font-medium'>
			<h3 className='mb-4 text-3xl sm:text-4xl font-bold text-center'>Start Excel-ing at Exams!</h3>
			<div className='text-slate-400 mb-4 text-lg text-center'>
				<p>Select the categories you would like to be tested on!</p>
			</div>
			<Separator />
			{Object.entries(questions).length > 0 ? (
				<form onSubmit={onSubmit}>
					<div className='mt-4 rounded-md border border-gray-100/10 '>
						<h4 className='flex justify-between items-center text-slate-300 py-2 px-5 border-b border-gray-100/10 bg-slate-800/50'>
							<p>Categories</p>
							<p>Selected ({selectedCategories.length})</p>
						</h4>

						<div className='px-4 flex items-center justify-between py-2 border-b border-gray-100/10 tracking-normal'>
							<CategoryCheckbox
								onChange={e => {
									setCheckAll(e.target.checked)
									const tempQuestionsState: Record<string, IQuestionWithCheck> = {}
									const categories: string[] = [...selectedCategories]
									Object.keys(questions).forEach(questionKey => {
										tempQuestionsState[questionKey] = {
											checked: e.target.checked,
											content: questions[questionKey].content.map(crnQuestion => {
												if (!categories.includes(crnQuestion.category)) {
													categories.push(crnQuestion.category)
												}

												return {
													...crnQuestion,
													checked: e.target.checked,
												}
											}),
										}
									})
									setQuestions(tempQuestionsState)
									handleChecking(categories, e.target.checked)
								}}
								checked={checkAll}
								id='All'
								category='All'
							/>
							<p className='text-slate-400 text-xs sm:text-sm tracking-normal'>
								Correct questions{" "}
								<span className='font-semibold'>({auth.user?.exam.correctAnswers.length})</span> of{" "}
								<span className='font-semibold'>({amountQuestions})</span>
							</p>
						</div>
						{/* Display each category and their children */}
						{Object.entries(questions).map((questionLoad, i) => (
							<div className='tracking-normal' key={questionLoad[0] + i}>
								{" "}
								<div
									className={`${
										questionLoad[0] === "None" || questionLoad[0] === "All" ? "hidden" : ""
									} flex p-4 pl-6 items-center justify-between py-2 border-b border-gray-100/10`}
								>
									{/** Show the parent label */}
									<CategoryCheckbox
										id={questionLoad[0]}
										category={questionLoad[0]}
										checked={questionLoad[1].checked}
										onChange={e => {
											setQuestions({
												...questions,
												[questionLoad[0]]: {
													checked: e.target.checked,
													content: questionLoad[1].content.map(crnQuestion => {
														return {
															...crnQuestion,
															checked: e.target.checked,
														}
													}),
												},
											})
											// Check if the category is an array or a single string
											handleChecking(
												questionLoad[1].content.reduce((arr, cat) => {
													if (!arr.includes(cat.category)) {
														return [...arr, cat.category]
													}

													return arr
												}, [] as string[]),
												e.target.checked
											)
										}}
									/>
									<p className='pr-4 text-slate-400 text-xs sm:text-sm'>
										Questions ({questionLoad[1].content.length})
									</p>
								</div>
								{/* Displays the categories of a parent one */}
								<ul className='flex flex-col'>
									{questionLoad[1].content
										.filter((item, k) => {
											// Filter the categories to remove the questions repeated
											return (
												questionLoad[1].content.findIndex(
													question => question.category === item.category
												) === k
											)
										})
										.map((question, j) => (
											<li
												className={`${
													questionLoad[0] === "None" || questionLoad[0] === "All"
														? "pl-6 py-2"
														: "pl-8 py-2"
												} flex items-center  justify-between border-b border-gray-100/10`}
												key={question._id}
											>
												<CategoryCheckbox
													category={question.category}
													id={j}
													checked={question.checked}
													onChange={e => {
														// * Active the parent category automatically
														let isEveryItemUnchecked: boolean
														const childrenCategories = questions[
															["All", "None"].includes(question.parent)
																? "None"
																: question.parent
														].content.reduce(
															(arr, item) => {
																if (!arr.some(it => it.name === item.category)) {
																	arr.push({
																		name: item.category,
																		checked: (!e.target.checked
																			? selectedCategories.filter(
																					cat => cat !== question.category
																			  )
																			: [
																					...selectedCategories,
																					e.target.checked
																						? question.category
																						: null,
																			  ]
																		).includes(item.category),
																	})
																}
																return arr
															},
															[] as {
																name: string
																checked: boolean
															}[]
														)

														isEveryItemUnchecked = childrenCategories.every(
															item => !item.checked
														)
														// * Toggle the checked state of the single category checkbox
														setQuestions({
															...questions,
															[questionLoad[0]]: {
																...questionLoad[1],
																checked: !isEveryItemUnchecked,
																content: questionLoad[1].content.map(
																	(crnQuestion, l) => {
																		return crnQuestion.category === e.target.value
																			? {
																					...crnQuestion,
																					checked: e.target.checked,
																			  }
																			: crnQuestion
																	}
																),
															},
														})
														handleChecking(e.target.value, e.target.checked)
													}}
												/>
											</li>
										))}
								</ul>
							</div>
						))}
					</div>
					<div className='flex max-sm:flex-col max-sm:gap-y-4 justify-between mt-6 mx-4'>
						<div className='flex justify-center gap-4 items-center'>
							<FilterRadioButton
								description='Pick up all the selected categories'
								value='ALL'
								onChange={e => setFilter(e.target.value as FilterSetExamType)}
							/>
							<FilterRadioButton
								description='Pick up the questions answered incorrectly'
								onChange={e => setFilter(e.target.value as FilterSetExamType)}
								value='INCORRECT'
							/>
							<FilterRadioButton
								description='Not answered questions'
								value='NEW'
								onChange={e => setFilter(e.target.value as FilterSetExamType)}
							/>
						</div>
						<SolidButton
							as={ComponentElement.BUTTON}
							submit={true}
							theme={filter ? themeBtns.blueBtn : themeBtns.neutralBtn}
						>
							<div
								className={`flex justify-center items-center gap-3 ${
									filter ? "cursor-pointer" : "cursor-not-allowed"
								}`}
							>
								{filter ? (
									<svg
										className='w-6'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path
											clipRule='evenodd'
											fillRule='evenodd'
											d='M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z'
										/>
									</svg>
								) : (
									<svg
										className='w-6'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path
											clipRule='evenodd'
											fillRule='evenodd'
											d='M11 2a1 1 0 10-2 0v6.5a.5.5 0 01-1 0V3a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V5a1 1 0 10-2 0v7a7 7 0 1014 0V8a1 1 0 10-2 0v3.5a.5.5 0 01-1 0V3a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V2z'
										/>
									</svg>
								)}
								{filter ? "Start Now" : "Choose a filter"}
							</div>
						</SolidButton>
					</div>
				</form>
			) : (
				<div className='flex items-center justify-center mt-4'>
					<Spin />
				</div>
			)}
		</div>
	)
}
export default CategoriesSelector
