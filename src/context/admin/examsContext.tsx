import { createContext, PropsWithChildren, useContext, useState } from "react"
import { IExamsAdminContext } from "../../interface/admin"
import { ICBQQuestion, IQuestion } from "../../interface/exam"

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

	// * The markdown content of the add question form
	const [markdownContent, setMarkdownContent] = useState("")

	// * Preview question modal
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)
	const [previewQuestion, setPreviewQuestion] = useState({} as IQuestion)

	// * Has an state for every type of question
	const SBAInitialState = {
		answer: 0,
		explanation: "",
		options: ["", ""],
		question: "",
	}
	const [SBAContent, setSBAContent] = useState(SBAInitialState)

	const ECQInitialState = {
		options: ["", ""],
		question: [
			{
				question: "",
				answer: 0,
			},
		],
		explanation: "",
	}
	const [ECQContent, setECQContent] = useState(ECQInitialState)

	const CBQInitialState: ICBQQuestion = [
		{
			question: "",
			answer: 0,
			options: ["", ""],
			explanation: "",
		},
		{
			question: "",
			answer: 0,
			options: ["", ""],
			explanation: "",
		},
	]
	const [CBQContent, setCBQContent] = useState(CBQInitialState)

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
				questionForm: {
					markdownContent,
					setMarkdownContent,

					SBAContent,
					setSBAContent,
					resetSBAContent() {
						setSBAContent(SBAInitialState)
					},

					ECQContent,
					setECQContent,
					resetECQContent() {
						setECQContent(ECQInitialState)
					},

					CBQContent,
					setCBQContent,
					resetCBQContent() {
						setCBQContent(CBQInitialState)
					},
				},
			}}>
			{children}
		</examsContext.Provider>
	)
}
