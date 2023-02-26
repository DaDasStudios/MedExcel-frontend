import { Form, Formik } from "formik"
import { Select, TextArea, Input } from "./Input"
import { IQuestionFormState } from "../../../../../../interface/admin"
import {
	markdownExampleText,
	parentCategories,
	questionCategories,
} from "../../../../../../utils/question"
import * as yup from "yup"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import SBAQuetion from "./SBAQuestion"
import SolidButton, {
	themeBtns,
} from "../../../../../../components/ui/Buttons/SolidButton"
import { ComponentElement } from "../../../../../../interface"
import { useAdminContext } from "../../../../../../context/admin/adminContext"
import toast from "react-hot-toast"
import {
	addQuestionRequest,
	updateQuestionRequest,
} from "../../../../../../lib/admin.request"
import Spin from "../../../../../../components/ui/Spin"
import ECQQuestion from "./ECQQuestion"
import CBQQUestion from "./CBQQuestion"

const QuestionForm = () => {
	const { questionForm, setQuestions } = useExamsAdminContext()
	const { auth } = useAdminContext()
	const initialValues: IQuestionFormState =
		questionForm.generalQuestionContent
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={yup.object({
				scenario: yup.string().required("Required"),
				topic: yup.string().required("Required"),
			})}
			enableReinitialize={true}
			onSubmit={async (values, { setValues, setSubmitting }) => {
				try {
					let body
					switch (values.type) {
						case "CBQ":
							if (
								questionForm.CBQContent.some(singleCase => {
									const hasVoidOptions =
										singleCase.options.some(
											option => !option
										)
									return (
										!singleCase.explanation ||
										!singleCase.question ||
										hasVoidOptions
									)
								})
							) {
								return toast.error("Fill up all the fields")
							}

							body = {
								...values,
								content: questionForm.CBQContent.map(
									question => {
										return {
											...question,
											answer: question.answer + 1,
										}
									}
								),
							}

							break

						case "ECQ":
							if (
								!questionForm.ECQContent.explanation ||
								questionForm.ECQContent.options.some(v => !v) ||
								questionForm.ECQContent.question.some(
									q => !q.question
								)
							) {
								return toast.error("Fill up all the fields")
							}
							body = {
								...values,
								content: {
									...questionForm.ECQContent,
									question:
										questionForm.ECQContent.question.map(
											q => {
												return {
													...q,
													answer: q.answer + 1,
												}
											}
										),
								},
							}
							break

						case "SBA":
							if (
								!questionForm.SBAContent.explanation ||
								!questionForm.SBAContent.question ||
								questionForm.SBAContent.options.some(
									singleOption => !singleOption
								)
							) {
								return toast.error("Fill up all the fields")
							}

							body = {
								...values,
								content: {
									...questionForm.SBAContent,
									answer: questionForm.SBAContent.answer + 1,
								},
							}
							break

						default:
							return toast.error("Unknown type of question")
					}

					if (questionForm.isEditing && questionForm.editId) {
						const res = await updateQuestionRequest(
							questionForm.editId,
							body,
							auth.token
						)
						if (
							res.status !== 200 &&
							res.data.message !== "Question updated"
						) {
							throw new Error("Failed to update question")
						}

						toast.success("Question updated")
						setQuestions(questions =>
							questions.map(question =>
								question._id === questionForm.editId
									? res.data.question
									: question
							)
						)
						questionForm.setEditId("")
						questionForm.setIsEditing(false)
					} else {
						const res = await addQuestionRequest(body, auth.token)
						if (
							res.status !== 200 &&
							res.data.message !== "New question saved"
						) {
							throw new Error("Failed to save question")
						}
						toast.success("New question saved")

						setQuestions(questions => {
							return [...questions, res.data.question]
						})
					}

					if (values.type === "SBA") questionForm.resetSBAContent()
					if (values.type === "ECQ") questionForm.resetECQContent()
					if (values.type === "CBQ") questionForm.resetCBQContent()
					setValues({
						category: values.category,
						scenario: "",
						type: values.type,
						parent: "All",
						topic: "",
					})
				} catch (error) {
					toast.error("Something went wrong... Try later")
				} finally {
					setSubmitting(false)
				}
			}}
		>
			{({ isSubmitting, setValues, values }) => (
				<Form ref={questionForm.formRef}>
					<div
						className='grid grid-cols-2 gap-4'
					>
						<div>
							<Select id='type' label='Type' name='type'>
								<option value='SBA'>
									Standard Single Best Answer
								</option>
								<option value='ECQ'>
									Extended Choice Question
								</option>
								<option value='CBQ'>
									Case Based Questions
								</option>
							</Select>
							<Select
								id='parent'
								name='parent'
								label='Parent category'
								value={values.parent}
							>
								{parentCategories.map((category, i) => (
									<option key={category + i}>
										{category}
									</option>
								))}
							</Select>
							<p className='mb-4 text-gray-400 text-sm text-center'>
								Specify "None" if the question hasn't a parent
								category
							</p>
							<Select
								id='category'
								name='category'
								label='Category'
							>
								{questionCategories.map((category, i) => (
									<option key={category + i}>
										{category}
									</option>
								))}
							</Select>
							<Input
								id='topic'
								label='Topic'
								name='topic'
								placeholder='A very specified categorization'
							/>
							<div>
								<TextArea
									setValues={setValues}
									id='scenario'
									label='Scenario'
									name='scenario'
									placeholder='You can even type Markdown syntax here if you want to show titles, tables, images, links and more...'
								/>
								<button
									type='button'
									onClick={() => {
										setValues({
											...values,
											scenario: markdownExampleText,
										})
										questionForm.setMarkdownContent(
											markdownExampleText
										)
									}}
									className='flex items-center text-gray-400 text-sm hover:underline'
								>
									<p>
										Click over here to see an example of how{" "}
										<span className='text-blue-400'>
											Markdown syntax works
										</span>
									</p>
								</button>
							</div>
							<div
								className={`flex gap-4 items-center justify-center mt-6 ${
									isSubmitting
										? "pointer-events-none"
										: "pointer-events-auto"
								}`}
							>
								<SolidButton
									as={ComponentElement.BUTTON}
									submit={true}
									theme={themeBtns.greenBtn}
								>
									<div className='flex gap-2 items-center'>
										{isSubmitting ? (
											<Spin />
										) : questionForm.isEditing ? (
											<svg
												className='w-6'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path d='M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z' />
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
													d='M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z'
												/>
											</svg>
										)}
										{questionForm.isEditing
											? "Edit"
											: "Create"}
									</div>
								</SolidButton>
								{questionForm.isEditing && (
									<SolidButton
										as={ComponentElement.BUTTON}
										submit={false}
										theme={themeBtns.redBtn}
										onClick={() => {
											questionForm.setEditId("")
											questionForm.setIsEditing(false)
											if (values.type === "SBA")
												questionForm.resetSBAContent()
											if (values.type === "ECQ")
												questionForm.resetECQContent()
											if (values.type === "CBQ")
												questionForm.resetCBQContent()
											setValues({
												category: values.category,
												scenario: "",
												type: values.type,
												parent: values.parent,
												topic: "",
											})
										}}
									>
										<div className='flex gap-2 items-center'>
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
													d='M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z'
												/>
											</svg>
											Cancel
										</div>
									</SolidButton>
								)}
							</div>
						</div>
						<div>
							{values.type === "SBA" && <SBAQuetion />}
							{values.type === "ECQ" && <ECQQuestion />}
							{values.type === "CBQ" && <CBQQUestion />}
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}
export default QuestionForm
