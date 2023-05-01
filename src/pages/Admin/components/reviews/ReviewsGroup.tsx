import Spin from "../../../../components/ui/Spin"
import { useQuestionReviewContext } from "../../../../context/admin/reviewsContext"
import { IQuestionReview } from "../../../../interface/questionReview"
import ReviewCard from "./ReviewCard"
import { useState, useMemo, useEffect } from "react"

const REVIEWS_PER_PAGE = 30

const ReviewsGroup = () => {
	const { reviews, fetchReviews } = useQuestionReviewContext()

	const [page, setPage] = useState(0)

	const paginatedReviews = useMemo(() => {
		const chunkReviews: Array<IQuestionReview[]> = []
		for (let i = 0; i < reviews.length; i += REVIEWS_PER_PAGE) {
			chunkReviews.push(reviews.slice(i, i + REVIEWS_PER_PAGE))
		}
		return chunkReviews
	}, [reviews])

	function changePage(increment: number) {
		if (page === paginatedReviews.length - 1 && increment === 1) {
			return
		} else if (page === 0 && increment === -1) {
			return
		} else {
			setPage(p => p + increment)
		}
	}

	useEffect(() => {
		fetchReviews()
	}, [])

	if (reviews.length === 0) {
		return (
			<div className='flex flex-col gap-4 items-center justify-center'>
				<Spin />
				<p className='text-gray-400 text-xl'>
					Loading question reviews...
				</p>
			</div>
		)
	}

	return (
		<>
			<div className='grid grid-cols-5 gap-x-5'>
				{reviews.map(review => (
					<ReviewCard review={review} key={review._id} />
				))}
			</div>
			<div className='text-gray-200 font-medium mt-4 flex items-center justify-between'>
				<h4 className='text-gray-300 font-medium'>
					Found {paginatedReviews[page].length} reviews at the page{" "}
					{page + 1}/{paginatedReviews.length}
				</h4>
				<div className='flex justify-end'>
					<button
						type='button'
						className='rounded-lg border-slate-100/10 bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center'
						onClick={() => changePage(-1)}
					>
						<svg
							className='w-7'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
							/>
						</svg>
					</button>
					<div className='flex flex-row gap-x-1.5 items-center justify-center mx-0.5'>
						{paginatedReviews.map((_, p) => (
							<>
								{p === page ? (
									<span
										key={"page " + p}
										className='w-4 h-4 bg-slate-100/30 rounded-full'
									></span>
								) : (
									<span
										key={"page " + p}
										onClick={() => setPage(p)}
										className='w-3.5 h-3.5 bg-slate-100/10 rounded-full cursor-pointer hover:bg-slate-100/20'
									></span>
								)}
							</>
						))}
					</div>
					<button
						type='button'
						className='rounded-lg border-slate-100/10 bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center'
						onClick={() => changePage(1)}
					>
						<svg
							className='w-7'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
							/>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
}
export default ReviewsGroup
