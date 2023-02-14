import BackgroundImage from "../../components/ui/BackgroundImage"
import AOS from "aos"
import { useEffect } from "react"
import GetExam from "./components/GetExam"

const Exam = () => {
	useEffect(() => {
		AOS.init()
		AOS.refresh()
	}, [])
	return (
		<>
			<BackgroundImage url='/img/exam-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='mx-auto max-w-xl'>
            <GetExam/>
          </article>
			</section>
		</>
	)
}
export default Exam
