import { ExamContextProvider } from "../../context/exam/examContext"
import BackgroundImage from "../../components/ui/BackgroundImage"
import QuestionWrapper from "./components/QuestionWrapper"
import EnterTransition from "../../components/ui/EnterTransition"

const Exam = () => {
	return (
		<ExamContextProvider>
			<BackgroundImage
				url="/img/startedexam-page-image.jpg"
			/>
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<EnterTransition>
					<article className="max-w-4xl mx-auto">
						<QuestionWrapper />
					</article>
				</EnterTransition>
			</section>
		</ExamContextProvider>
	)
}
export default Exam
