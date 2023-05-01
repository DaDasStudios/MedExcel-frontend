import { Form, Formik } from "formik"
import SideBarElement from "./ui/SideBarElement"
import * as yup from "yup"
import { Input } from "../../../components/ui/Input"
import { themeBtns } from "../../../components/ui/Buttons/SolidButton"
import { useState } from "react"
import Spin from "../../../components/ui/Spin"
import { postQuestionReview } from "../../../lib/user.request"
import { useAuthContext } from "../../../context/auth/authContext"
import { useExamContext } from "../../../context/exam/examContext"
import { toast } from "react-hot-toast"

interface IQuestionReview {
	rate: number
	review: string
}

const MAX_STARS = 5

const QuestionReview = () => {
	const { auth } = useAuthContext()
	const { currentQuestion } = useExamContext()

	const [stars, setStars] = useState(4)
	const [rated, setRated] = useState(false)

	return (
		<aside className='min-[400px]:max-lg:w-[300px] max-lg:max-w-[300px] max-lg:mx-auto lg:col-span-2 py-6 px-5 sm:p-5 bg-slate-900/80 h-fit rounded-md border border-gray-100/10 shadow-md'>
			<div className='font-medium text-gray-300 text-normal'>
				<SideBarElement>
					<svg
						className='w-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
						/>
					</svg>
					<h4 className='font-medium'>
						{rated ? "Question rated" : "Rate this question"}
					</h4>
				</SideBarElement>
				<div className='mt-4'>
					<Formik<IQuestionReview>
						initialValues={{
							rate: stars,
							review: "",
						}}
						validationSchema={yup.object({
							review: yup
								.string()
								.min(10, "Must be 10 characters or more")
								.required("Required"),
						})}
						onSubmit={async (
							{ rate, review },
							{ setSubmitting }
						) => {
							try {
								setSubmitting(true)
								const { data } = await postQuestionReview(
									currentQuestion._id,
									auth?.token || "",
									review,
									rate
								)
								if (data.status === "RESOURCE_CREATED") {
									setRated(true)
									toast.success("Rate was successfully")
								}
							} catch (error) {
								toast.error("Unknown error")
							} finally {
								setSubmitting(false)
							}
						}}
					>
						{({ isSubmitting, values, setValues }) => (
							<Form>
								<Input
									id='review'
									name='review'
									label='Details'
									placeholder='Let us know what you think about this question'
									showLabel={false}
									readOnly={rated}
									as='textarea'
								/>
								<div
									className={`flex items-center justify-center gap-x-1.5 ${
										rated ? "-mt-2" : "-my-2"
									}`}
								>
									{rated
										? Array.from(
												{ length: MAX_STARS },
												(_, i) => i + 1
										  ).map(starValue => (
												<span
													key={"start" + starValue}
													className={`${
														starValue <= stars
															? "text-gray-300"
															: "text-gray-400"
													}`}
												>
													<svg
														className='w-5'
														fill='currentColor'
														viewBox='0 0 20 20'
														xmlns='http://www.w3.org/2000/svg'
														aria-hidden='true'
													>
														<path
															clipRule='evenodd'
															fillRule='evenodd'
															d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
														/>
													</svg>
												</span>
										  ))
										: Array.from(
												{ length: MAX_STARS },
												(_, i) => i + 1
										  ).map(starValue => (
												<span
													key={"start" + starValue}
													className={`${
														starValue <= stars
															? "text-gray-300"
															: "text-gray-400"
													} hover:text-gray-300 cursor-pointer`}
													onMouseOver={() =>
														setStars(starValue)
													}
													onMouseLeave={() =>
														setStars(values.rate)
													}
													onClick={() =>
														setValues(v => {
															return {
																...v,
																rate: starValue,
															}
														})
													}
												>
													<svg
														className='w-5'
														fill='currentColor'
														viewBox='0 0 20 20'
														xmlns='http://www.w3.org/2000/svg'
														aria-hidden='true'
													>
														<path
															clipRule='evenodd'
															fillRule='evenodd'
															d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
														/>
													</svg>
												</span>
										  ))}
								</div>
								{!rated && (
									<button
										type='submit'
										className={`flex justify-center items-center gap-2 py-2 px-3 border rounded-md mt-6 mb-1 w-full ${
											themeBtns.greenBtn
										} ${
											isSubmitting &&
											"pointer-events-none cursor-not-allowed"
										}`}
									>
										{isSubmitting ? (
											<Spin />
										) : (
											<svg
												className='w-5'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path d='M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.9s04-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z' />
											</svg>
										)}
										<p>Rate</p>
									</button>
								)}
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</aside>
	)
}
export default QuestionReview
