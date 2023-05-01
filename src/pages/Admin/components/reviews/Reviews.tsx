import Breadcrumb from "../../../../components/ui/Breadcrumb"
import { QuestionReviewContextProvider } from "../../../../context/admin/reviewsContext"
import ReviewModal from "./ReviewModal"
import ReviewsFilter from "./ReviewsFilter"
import ReviewsGroup from "./ReviewsGroup"

const Reviews = () => {
	return (
		<QuestionReviewContextProvider>
			<Breadcrumb
				elements={[
					<span className='flex items-center gap-3'>
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
								d='M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z'
							/>
						</svg>
						Admin
					</span>,
					<span>Reviews</span>,
					<p className='text-gray-300'>Overview</p>,
				]}
			/>
			<h1 className='text-2xl font-semibold my-4'>Users' reviews</h1>
			<ReviewsFilter/>
			<ReviewsGroup />
            <ReviewModal/>
		</QuestionReviewContextProvider>
	)
}
export default Reviews
