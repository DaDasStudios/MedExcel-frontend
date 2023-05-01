import BackgroundImage from "../../components/ui/BackgroundImage"
import GetExam from "./components/GetExam"
import { useAuthContext } from "../../context/auth/authContext"
import ShowQuestion from "./components/ShowQuestion"
import { ExamContextProvider } from "../../context/exam/examContext"
import Confetti from "./Confetti"

const Exam = () => {
	const { auth } = useAuthContext()

	return (
		<ExamContextProvider>
			<BackgroundImage
				url={
					auth.user?.exam.startedAt
						? "/img/startedexam-page-image.jpg"
						: "/img/exam-page-image.jpg"
				}
			/>
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4 animate-enter'>
				<article
					className={`${
						auth.user?.exam.startedAt ? "max-w-4xl" : "max-w-xl"
					} mx-auto `}>
					{auth.user?.exam.startedAt ? <ShowQuestion /> : <GetExam />}
				</article>
			</section>
			<Confetti/>
		</ExamContextProvider>
	)
}
export default Exam
