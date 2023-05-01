import Tooltip from "../../../../components/ui/Tooltip"
import { useQuestionReviewContext } from "../../../../context/admin/reviewsContext"
import { IQuestionReview } from "../../../../interface/questionReview"
import { formatDate } from "../../../../utils/date"
import { toTitle } from "../../../../utils/string"
import QuestionInfo from "./QuestionInfo"
import UserInfo from "./UserInfo"

interface IProps {
	review: IQuestionReview
}

const ReviewCard = ({ review }: IProps) => {
	const { deleteReview, openModal } = useQuestionReviewContext()
	return (
		<div className='text-gray-300 flex flex-col gap-2 bg-slate-700/50 transition-colors hover:bg-slate-700 p-4 rounded-md shadow-md border border-gray-100/10'>
			<div className='flex items-center justify-center gap-x-1'>
				{Array.from({ length: 5 }, (_, i) => i + 1).map(starValue => (
					<span
						key={`StarId:${review._id}&value:${starValue}`}
						className={`${
							starValue <= review.rate
								? "text-gray-300"
								: "text-slate-400"
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
				))}
			</div>
			<h5 className='text-gray-300'>{toTitle(review.review)}</h5>
			<div className='flex items-center justify-between mt-1'>
				<p className='text-slate-400 text-xs text-start'>
					{formatDate.format(new Date(review.createdAt))}
				</p>
				<div className='justify-self-end flex items-center gap-x-2.5'>
					<Tooltip message='Search question'>
						<button
							type='button'
							className='hover:text-white'
							onClick={() => openModal(<QuestionInfo id={review.questionId}/>)}
						>
							<svg
								className='w-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path d='M8 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									d='M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm5 5a3 3 0 101.524 5.585l1.196 1.195a.75.75 0 101.06-1.06l-1.195-1.196A3 3 0 009.5 7z'
								/>
							</svg>
						</button>
					</Tooltip>
					<Tooltip message='Search user'>
						<button
							type='button'
							className='hover:text-white'
							onClick={() => openModal(<UserInfo id={review.authorId}/>)}
						>
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
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z'
								/>
							</svg>
						</button>
					</Tooltip>
					<Tooltip message='Delete'>
						<button
							type='button'
							className='hover:text-white'
							onClick={() => deleteReview(review._id)}
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
									d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
								/>
							</svg>
						</button>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}
export default ReviewCard
