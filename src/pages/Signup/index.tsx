import BackgroundImage from "../../components/ui/BackgroundImage"
import { EnterTransition } from "../../components/ui/transitions"
import SignupForm from "./components/SignupForm"

const Signup = () => {

	return (
		<>
			<BackgroundImage url='/img/signup-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<EnterTransition>
					<article className='mx-auto max-w-lg'>
						<SignupForm></SignupForm>
					</article>
				</EnterTransition>
			</section>
		</>
	)
}

export default Signup
