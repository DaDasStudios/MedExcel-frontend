import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "../../styles/markdown.scss"

interface IProps {
	content: string
}

const MarkdownBody = ({ content }: IProps) => {
	return (
		<article className='markdown-body p-2 rounded-md'>
			<ReactMarkdown
				children={
					content
						? content
						: `
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
