import { Form, Formik } from "formik"
import { Select, TextArea } from "./Input"
import { IQuestionFormState } from "../../../../../../interface/admin"
import {
	markdownExampleText,
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
import { addQuestionRequest } from "../../../../../../lib/admin.request"
import Spin from "../../../../../../components/ui/Spin"
import ECQQuestion from "./ECQQuestion"

const QuestionForm = () => {
	const { questionForm, setQuestions } = useExamsAdminContext()
	const { auth } = useAdminContext()
	const initialValues: IQuestionFormState = {
		category: "Dermatology",
		scenario: "",
		type: "SBA",
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={yup.object({
				scenario: yup.string().required("Required"),
			})}
			onSubmit={async (values, { resetForm, setSubmitting }) => {
				try {
					let body
					switch (values.type) {
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
								!questionForm.SBAContent.options
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

					const res = await addQuestionRequest(body, auth.token)

					if (
						res.status !== 200 &&
						res.data.message !== "New question saved"
					) {
						throw new Error("Failed to save question")
					}

					toast.success("New question saved")
					resetForm()
					if (values.type === "SBA") questionForm.resetSBAContent()
					if (values.type === "ECQ") questionForm.resetECQContent()
					setQuestions(questions => {
						return [...questions, res.data.question]
					})
				} catch (error) {
					toast.error("Something went wrong... Try later")
				} finally {
					setSubmitting(false)
				}
			}}>
			{({ isSubmitting, setValues, values }) => (
				<Form>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<Select
								id='type'
								label='Type'
								name='type'>
								<option value='SBA'>
									Standard Single Best Answer
								</option>
								<option value='ECQ'>
									Extended Choice Question
								</option>
								<option value='CBQ'>
									Case based questions
								</option>
							</Select>
							<Select
								id='category'
								name='category'
								label='Category'>
								{questionCategories.map((category, i) => (
									<option key={category + i}>
										{category}
									</option>
								))}
							</Select>
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
									className='flex items-center text-gray-400 text-sm hover:underline'>
									<p>
										Click over here to see an example of how{" "}
										<span className='text-blue-400'>
											Markdown syntax works
										</span>
									</p>
								</button>
							</div>
							<div
								className={`flex justify-center mt-6 ${
									isSubmitting
										? "pointer-events-none"
										: "pointer-events-auto"
								}`}>
								<SolidButton
									as={ComponentElement.BUTTON}
									submit={true}
									theme={themeBtns.greenBtn}>
									<div className='flex gap-2 items-center'>
										{isSubmitting ? (
											<Spin />
										) : (
											<svg
												className='w-6'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'>
												<path
													clipRule='evenodd'
													fillRule='evenodd'
													d='M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z'
												/>
											</svg>
										)}
										Submit
									</div>
								</SolidButton>
							</div>
						</div>
						<div>
							{values.type === "SBA" && <SBAQuetion />}
							{values.type === "ECQ" && <ECQQuestion />}
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}
export default QuestionForm
