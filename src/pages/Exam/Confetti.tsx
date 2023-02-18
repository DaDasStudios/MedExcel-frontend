import useWindowSize from "react-use/lib/useWindowSize"
import ConfettiReact from "react-confetti"
import { useExamContext } from "../../context/exam/examContext"

const Confetti = () => {
	const { hasFinished } = useExamContext()
	const { width, height } = useWindowSize()
	return <>{hasFinished && <ConfettiReact width={width} height={height} />}</>
}
export default Confetti
