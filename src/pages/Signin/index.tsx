import BackgroundImage from "../../components/ui/BackgroundImage"
import SigninForm from "./components/SigninForm"
import { EnterTransition } from "../../components/ui/transitions"

const Signup = () => {

	return (
		<>
			<BackgroundImage url='/img/signin-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<EnterTransition>
					<article className='mx-auto max-w-lg'>
						<SigninForm></SigninForm>
					</article>
				</EnterTransition>
			</section>
		</>
	)
}

export default Signup
