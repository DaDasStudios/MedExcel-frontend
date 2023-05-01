import Tooltip from "./Tooltip"

interface IProps {
	src?: string
	alt?: string
}

const ClickeableImage = ({ src, alt, ...props }: IProps) => {
	function openImageTab() {
		const newWindow = window.open("", "_blank")
		newWindow?.document.write(`<img src=${src} alt="Image"/>`)
	}

	return (
		<div>
			<Tooltip message="Expand">
				<img
					className='cursor-pointer object-contain w-52 sm:w-72 md:w-80 lg:w-96 mx-auto hover:scale-105 transition-all duration-500'
					onClick={openImageTab}
					src={src}
					alt={alt}
				/>
			</Tooltip>
		</div>
	)
}
export default ClickeableImage
