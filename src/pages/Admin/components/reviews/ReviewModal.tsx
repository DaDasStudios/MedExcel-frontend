import Modal from "../../../../components/ui/Modal"
import { useQuestionReviewContext } from "../../../../context/admin/reviewsContext"

const ReviewModal = () => {
	const { isModalOpen, closeModal, modalChildren } =
		useQuestionReviewContext()
	return (
		<Modal closeModal={closeModal} rendered={isModalOpen}>
			<div className='max-w-[550px] max-h-[400px] overflow-y-auto pr-4'>
				{modalChildren}
			</div>
		</Modal>
	)
}
export default ReviewModal
