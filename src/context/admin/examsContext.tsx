import { createContext, PropsWithChildren, useContext, useState } from "react"
import { IExamsAdminContext } from "../../interface/admin"
import { IQuestion } from "../../interface/exam"

const examsContext = createContext({} as IExamsAdminContext)

export const useExamsAdminContext = () => useContext(examsContext)

export const ExamsAdminContextProvider = function ({
	children,
}: PropsWithChildren) {
	// * All questions
	const [questions, setQuestions] = useState([] as IQuestion[])

	// * Mark down visualizer modal
	const [isVisualizerOpen, setIsVisualizerOpen] = useState(false)
	const [visualizerContent, setVisualizerContent] = useState("")

	// * Preview question modal
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)
	const [previewQuestion, setPreviewQuestion] = useState({} as IQuestion)

	function closeVisualizerModal() {
		setIsVisualizerOpen(false)
		setVisualizerContent("")
	}

	function openVisualizerModal(content: string) {
		closePreviewModal()
		setIsVisualizerOpen(true)
		setVisualizerContent(content)
	}

	function closePreviewModal() {
		setIsPreviewOpen(false)
		setPreviewQuestion({} as IQuestion)
	}

	function openPreviewModal(question: IQuestion) {
		closeVisualizerModal()
		setIsPreviewOpen(true)
		setPreviewQuestion(question)
	}

	return (
		<examsContext.Provider
			value={{
				questions,
				setQuestions,
				visualizerModal: {
					content: visualizerContent,
					isVisualizerOpen,
					closeModal: closeVisualizerModal,
					openModal: openVisualizerModal,
				},
				previewModal: {
					rendered: isPreviewOpen,
					question: previewQuestion,
					openModal: openPreviewModal,
					closeModal: closePreviewModal,
				},
			}}>
			{children}
		</examsContext.Provider>
	)
}
