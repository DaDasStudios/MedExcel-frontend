import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "../../styles/markdown.scss"
import ClickeableImage from "./ClickeableImage"

interface IProps {
	content: string
}

const MarkdownBody = ({ content }: IProps) => {
	return (
		<article className='markdown-body'>
			<ReactMarkdown
				components={{
					img: ({ node, ...props }) => <ClickeableImage src={props.src} alt={props.alt} />,
				}}
				children={
					content ||`
# Ups...
Nothing is alive here... Type some markdown text and you'll see it on here
`
				}
				remarkPlugins={[remarkGfm]}
			/>
		</article>
	)
}
export default MarkdownBody
