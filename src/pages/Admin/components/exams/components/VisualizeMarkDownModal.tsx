import Modal from "../../../../../components/ui/Modal"
import { useExamsAdminContext } from "../../../../../context/admin/examsContext"
import MarkdownBody from "../../../../../components/ui/MarkdownBody"

const VisualizeMarkDownModal = () => {
	const {
		visualizerModal: { isVisualizerOpen, closeModal, content },
	} = useExamsAdminContext()
	return (
		<Modal
			closeModal={closeModal}
			rendered={isVisualizerOpen}>
			<MarkdownBody content={content} />
		</Modal>
	)
}
export default VisualizeMarkDownModal
