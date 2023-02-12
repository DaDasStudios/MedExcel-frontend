import { useExamsAdminContext } from "../../../../../../context/admin/examsContext"
import MarkdownBody from "../../../../../../components/ui/MarkdownBody"

const MarkdownCanvas = () => {
	const { questionForm } = useExamsAdminContext()
	return (
		<div className="max-h-[550px] overflow-y-auto pr-4">
			<MarkdownBody content={questionForm.markdownContent} />
		</div>
	)
}
export default MarkdownCanvas
