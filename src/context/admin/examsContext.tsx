import { createContext, PropsWithChildren, useContext, useState } from "react"
import { IExamsAdminContext } from "../../interface/admin"
import { IQuestion } from "../../interface/exam"

const examsContext = createContext({} as IExamsAdminContext)

export const useExamsAdminContext = () => useContext(examsContext)

export const ExamsAdminContextProvider = function ({
	children,
}: PropsWithChildren) {
	const [questions, setQuestions] = useState([] as IQuestion[])
	const [isVisualizerOpen, setIsVisualizerOpen] = useState(false)
	const [visualizerContent, setVisualizerContent] = useState("")

	return (
		<examsContext.Provider
			value={{
				questions,
				setQuestions,
				visualizerModal: {
					content: visualizerContent,
					isVisualizerOpen,
					closeModal() {
						setIsVisualizerOpen(false)
						setVisualizerContent("")
					},
					openModal(content) {
						setIsVisualizerOpen(true)
						setVisualizerContent(content)
					},
				},
			}}>
			{children}
		</examsContext.Provider>
	)
}
