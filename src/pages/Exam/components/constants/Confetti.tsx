import useWindowSize from "react-use/lib/useWindowSize"
import ConfettiReact from "react-confetti"

const Confetti = () => {
	const { width, height } = useWindowSize()
	
	return <ConfettiReact width={width} height={height} />
}
export default Confetti
