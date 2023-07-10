import BackgroundImage from "../../components/ui/BackgroundImage";
import EnterTransition from "../../components/ui/transitions/EnterTransition";
import CategoriesSelector from "./components/start/CategoriesSelector";

export default function StartExam() {
  return (
		<>
			<BackgroundImage url='/img/exam-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<EnterTransition>
					<article className="max-w-xl mx-auto">
						<CategoriesSelector />
					</article>
				</EnterTransition>
			</section>
		</>
  )
}