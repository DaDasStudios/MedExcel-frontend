import { useState } from "react"
import { useQuestionReviewContext } from "../../../../context/admin/reviewsContext"

type TypeOrder = "DATE" | "STARS"

const ReviewsFilter = () => {
	const { setReviews, reviews } = useQuestionReviewContext()

	const [typeOrder, setTypeOrder] = useState<TypeOrder>("DATE")
	const [orderByGreaterStars, setOrderByGreaterStars] = useState(false)
	const [orderByLatest, setOrderByLatest] = useState(true)

	function handleDateOrder() {
		if (typeOrder === "STARS") {
			setTypeOrder("DATE")
		}
		if (typeOrder === "DATE") {
			setOrderByLatest(v => !v)
			setReviews(reviews =>
				[...reviews].sort(
					(a, b) =>
						new Date(a.createdAt).getTime() *
							(orderByLatest ? 1 : -1) -
						new Date(b.createdAt).getTime() *
							(orderByLatest ? 1 : -1)
				)
			)
		}
	}

	function handleStarsOrder() {
		if (typeOrder === "DATE") {
			setTypeOrder("STARS")
		}
		if (typeOrder === "STARS") {
			setOrderByGreaterStars(v => !v)
			setReviews(reviews =>
				[...reviews].sort(
					(a, b) =>
						a.rate * (orderByGreaterStars ? 1 : -1) -
						b.rate * (orderByGreaterStars ? 1 : -1)
				)
			)
		}
	}

	return (
		<div className='grid'>
			<div className='justify-self-end flex gap-3 items-center justify-around'>
				<p className='text-gray-300 font-semibold'>Order by:</p>
				<button
					type='button'
					className={`py-1.5 px-3 rounded-md shadow-md border outline-none flex gap-x-2 items-center ${
						typeOrder === "STARS"
							? "border-blue-200/50 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"
							: "border-slate-200/20 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300"
					}`}
					onClick={handleStarsOrder}
				>
					{orderByGreaterStars ? (
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
								d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
							/>
						</svg>
					) : (
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
								d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							/>
						</svg>
					)}
					<p>Stars</p>
				</button>
				<button
					type='button'
					className={`py-1.5 px-3 rounded-md shadow-md border outline-none flex gap-x-2 items-center ${
						typeOrder === "DATE"
							? "border-blue-200/50 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100"
							: "border-slate-200/20 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300"
					}`}
					onClick={handleDateOrder}
				>
					{orderByLatest ? (
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
								d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
							/>
						</svg>
					) : (
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
								d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							/>
						</svg>
					)}
					<p>Date</p>
				</button>
			</div>
		</div>
	)
}
export default ReviewsFilter
