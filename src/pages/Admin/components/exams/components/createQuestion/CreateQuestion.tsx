import MarkdownCanvas from "./MarkdownCanvas"
import QuestionForm from "./QuestionForm"

const CreateQuestion = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-10">
      <QuestionForm/>
      <MarkdownCanvas/>
    </div>
  )
}
export default CreateQuestion