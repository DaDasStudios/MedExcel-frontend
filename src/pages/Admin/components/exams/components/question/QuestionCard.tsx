import Separator from "../../../../../../components/ui/Separator"
import {
	IQuestion,
	QuestionType,
} from "../../../../../../interface/exam"
import { formatDate } from "../../../../../../utils/date"
import QuestionContent from "./QuestionContent"
import ViewButton from "../ViewButton"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import { toast } from "react-hot-toast"
import { deleteQuestionRequest } from "../../../../../../lib/admin.request"
import { useAdminContext } from "../../../../../../context/admin/adminContext"

interface IProps {
	question: IQuestion
	index: number
}

function handleStyle(type: QuestionType) {
	let style = "border transition-colors "
	switch (type) {
		case "SBA":
			return (
				style +
				"border-slate-50/20 bg-slate-900/90 hover:bg-slate-800 text-slate-200"
			)
		case "CBQ":
			return (
				style +
				"border-slate-100/20 bg-slate-900/10 hover:bg-slate-700 text-slate-200"
			)
		case "ECQ":
			return (
				style +
				"border-slate-100/20 bg-slate-900/50 hover:bg-slate-800 text-slate-200"
			)
	}
}

const QuestionCard = ({ question, index }: IProps) => {
	const { previewModal, setQuestions, questionForm } = useExamsAdminContext()
	const { auth } = useAdminContext()
	return (
		<div
			className={`relative flex flex-col gap-2 p-4 rounded-md shadow-md ${handleStyle(
				question.type
			)}`}>
			<span className='absolute flex gap-1.5 items-center text-gray-400 text-xs top-0 right-0 m-3'>
				<button className='relative outline-none p-1 hover:bg-gray-600 hover:text-gray-200 rounded-md group'>
					<svg
						className='w-4'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z'
						/>
					</svg>
					<div className='group-focus:block hidden bg-slate-800 border border-gray-100/10 p-3 rounded-md shadow-md left-1/2 right-1/2 -translate-x-1/2 bottom-[-90px] absolute max-w-[100px] w-fit'>
						<ul className='text-gray-300 flex flex-col gap-1.5'>
							<li
								onClick={() => previewModal.openModal(question)}
								className='flex items-center gap-2 hover:underline'>
								<svg
									className='w-3'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
								</svg>
								Preview
							</li>
							<li
								onClick={() => {
									questionForm.setIsEditing(true)
									questionForm.setEditId(question._id)
									questionForm.setGeneralQuestionContent({
										category: question.category,
										scenario: question.scenario,
										type: question.type,
										parent: question.parent
									})

									if (question.type === "SBA") {
										questionForm.setSBAContent({
											...question.content,
											answer: question.content.answer - 1,
										})
									}

									if (question.type === "ECQ") {
										questionForm.setECQContent({
											...question.content,
											question:
												question.content.question.map(
													(q: any) => {
														return {
															...q,
															answer:
																q.answer - 1,
														}
													}
												),
										})
									}

									if (question.type === "CBQ") {
										questionForm.setCBQContent(
											question.content.map((q: any) => {
												return {
													...q,
													answer: q.answer - 1,
												}
											})
										)
									}

									toast.success(
										"Use the add question form to edit this question"
									)
								}}
								className='flex items-center gap-2 hover:underline'>
								<svg
									className='w-3'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path d='M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z' />
								</svg>
								Edit
							</li>
							<li
								onClick={async () => {
									const wantsDelete = prompt(
										"Sure you want to delete this question? Yes/No",
										"No"
									)
									if (wantsDelete?.toLowerCase() === "yes") {
										try {
											const res =
												await deleteQuestionRequest(
													question._id,
													auth.token
												)

											if (
												res.status === 200 &&
												res.data.message ===
													"Question deleted"
											) {
												setQuestions(questions =>
													questions.filter(
														q =>
															q._id !==
															question._id
													)
												)
												return toast.success(
													"Question deleted"
												)
											}
										} catch (error) {
											toast.error(
												"Failed to delete this question"
											)
										}
									}
								}}
								className='flex items-center gap-2 hover:underline'>
								<svg
									className='w-3'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
									/>
								</svg>
								Delete
							</li>
						</ul>
					</div>
				</button>
				<p>{index + 1}</p>
			</span>
			<h6>
				{question.type} - {question.parent} / {question.category}
			</h6>
			<ViewButton content={question.scenario} />
			<Separator />
			<QuestionContent type={question.type} content={question.content} />

			<div className='flex items-center justify-between text-xs text-gray-400 mt-3'>
				<p className='flex gap-2 items-center'>
					{formatDate.format(new Date(question.createdAt))}
					<svg
						className='w-4'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path d='M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z' />
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z'
						/>
					</svg>
				</p>
				<p className='flex gap-2 items-center'>
					{formatDate.format(new Date(question.updatedAt))}
					<svg
						className='w-4'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path d='M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z' />
						<path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z' />
					</svg>
				</p>
			</div>
		</div>
	)
}
export default QuestionCard
