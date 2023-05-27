import Tooltip from "../../components/ui/Tooltip"
import { useSiteContext } from "../../context/site/siteContext"
import MarkdownBody from "../../components/ui/MarkdownBody"
import { referenceRangesContent } from "../../utils/markdown"

const ReferenceRanges = () => {
	const {
		modal: { open },
	} = useSiteContext()

    function handleOnClick() {
        open(<MarkdownBody content={referenceRangesContent}/>)
    }

	return (
		<Tooltip message='See reference ranges'>
			<button
				type='button'
				className={
					"border border-blue-100/20 bg-blue-700/50 hover:bg-blue-700/70 text-blue-100 rounded-md shadow-md mb-6 font-medium flex items-center gap-2 justify-center py-3 px-5 text-base w-full"
				}
				onClick={handleOnClick}
			>
				Reference ranges{" "}
				<svg
					className='w-6'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path d='M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z' />
				</svg>
			</button>
		</Tooltip>
	)
}
export default ReferenceRanges
