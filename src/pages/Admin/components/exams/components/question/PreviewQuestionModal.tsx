import Modal from "../../../../../../components/ui/Modal"
import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import QuestionPreview from "./QuestionPreview"

const PreviewQuestionModal = () => {
	const { previewModal } = useExamsAdminContext()
	return (
		<Modal
			closeModal={previewModal.closeModal}
			rendered={previewModal.rendered}>
			<article className='flex flex-col gap-2 max-w-min min-w-[600px] overflow-y-auto max-h-[400px] mt-2 pr-3'>
				<QuestionPreview
					type={previewModal.question.type}
					question={previewModal.question}
				/>
			</article>
		</Modal>
	)
}
export default PreviewQuestionModal
