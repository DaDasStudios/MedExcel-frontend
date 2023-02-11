import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import MarkdownBody from "../../../../../../components/ui/MarkdownBody"

const MarkdownCanvas = () => {
	const { questionForm } = useExamsAdminContext()
	return (
		<div>
			<MarkdownBody content={questionForm.markdownContent} />
		</div>
	)
}
export default MarkdownCanvas
