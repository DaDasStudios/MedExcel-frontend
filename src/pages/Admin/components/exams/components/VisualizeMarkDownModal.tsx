import Modal from "../../../../../components/ui/Modal"
import { useExamsAdminContext } from "../../../../../context/admin/examsContext"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import '../styles/markdown.scss'

const VisualizeMarkDownModal = () => {
	const {
		visualizerModal: { isVisualizerOpen, closeModal, content },
	} = useExamsAdminContext()
	return (
		<Modal
			closeModal={closeModal}
			rendered={isVisualizerOpen}>
			<ReactMarkdown
				children={content}
                className="markdown-container"
				remarkPlugins={[remarkGfm]}
			/>
		</Modal>
	)
}
export default VisualizeMarkDownModal
