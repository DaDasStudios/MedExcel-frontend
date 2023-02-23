import Modal from "../../../../../components/ui/Modal"
import { useExamsAdminContext } from "../../../../../context/admin/examsContext"
import MarkdownBody from "../../../../../components/ui/MarkdownBody"

const VisualizeMarkDownModal = () => {
	const {
		visualizerModal: { isVisualizerOpen, closeModal, content },
	} = useExamsAdminContext()
	return (
		<Modal closeModal={closeModal} rendered={isVisualizerOpen}>
			<div className="max-w-[550px] max-h-[400px] overflow-y-auto pr-4">
				<MarkdownBody content={content} />
			</div>
		</Modal>
	)
}
export default VisualizeMarkDownModal
