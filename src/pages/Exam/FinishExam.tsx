import SolidButton, { themeBtns } from "../../components/ui/Buttons/SolidButton"
import Separator from "../../components/ui/Separator"
import { useAuthContext } from "../../context/auth/authContext"
import { ComponentElement } from "../../interface"
import { formatDateDetailed } from "../../utils/date"
import Spin from "../../components/ui/Spin"
import Confetti from "./components/constants/Confetti"
import BackgroundImage from "../../components/ui/BackgroundImage"
import EnterTransition from "../../components/ui/EnterTransition"
import { Link } from "react-router-dom"

const FinishExam = () => {
	const {
		auth: { user },
	} = useAuthContext()

	if (!user) return <Spin />

	if (user.exam.scoresHistory.length === 0) {
		throw new Error("There's no previous exam records in your account")
	}

	const record = user.exam.scoresHistory[user.exam.scoresHistory.length - 1]

	return (
		<>
			<BackgroundImage url='/img/startedexam-page-image.jpg' />
			<section className='pt-[230px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md px-4'>
				<EnterTransition>
					<article className={`${user.exam.startedAt ? "max-w-4xl" : "max-w-xl"} mx-auto`}>
						<div className='bg-slate-900/70 rounded-md border border-gray-100/10 drop-shadow-lg lg:col-span-4 max-w-[300px] min-[400px]:max-w-[350px] min-[500px]:max-w-[400px] sm:max-w-[550px] justify-self-center mx-auto py-6 px-5 sm:p-8 overflow-x-auto h-fit'>
							<div className='flex flex-col gap-3 font-medium'>
								<h1 className='text-gray-200 text-center font-bold text-4xl'>Congratulations! 🎉</h1>
								<p className='text-gray-400 mt-3 text-lg text-center'>
									You’ve completed all new questions for now! We regularly add new questions so check
									back soon to see if there’s more content for you to test yourself with!
								</p>
								<p className='text-gray-400 mt-3 text-lg text-center'>
									In the mean time you can review all the questions you’ve not quite got correct yet!
								</p>
								<p className='text-gray-300 mt-3 text-lg text-center'>
									Good luck & Continue Excel-Ing!
								</p>
								<div className='my-3'>
									<h2 className='text-center text-gray-200 font-bold text-3xl'>
										Score in {record.score.toFixed(0)}%
									</h2>
									<div className='grid grid-cols-2 gap-3 justify-around mt-6'>
										<h3 className='text-center text-gray-300 text-lg font-semibold tracking-tight'>
											<span className='block'>Started at</span>
											<span>{formatDateDetailed.format(new Date(record.startedAt))}</span>
										</h3>
										<h3 className='text-center text-gray-300 text-lg font-semibold tracking-tight'>
											<span className='block'>Finished at</span>
											<span>{formatDateDetailed.format(new Date(record.finishedAt))}</span>
										</h3>
									</div>
								</div>
								<Separator />
								<div className='flex max-sm:flex-col items-center justify-between gap-6'>
									<p className='max-sm:order-last max-sm:text-center text-sm text-gray-400'>
										Only users with an actived subscription plan can see their exam records.
									</p>
									<Link to='/account'>
										<SolidButton as={ComponentElement.BUTTON} theme={themeBtns.greenBtn}>
											<div className='flex items-center gap-3'>
												<svg
													className='w-6'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
													aria-hidden='true'
												>
													<path
														clipRule='evenodd'
														fillRule='evenodd'
														d='M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
													/>
												</svg>
												Continue
											</div>
										</SolidButton>
									</Link>
								</div>
							</div>
						</div>
					</article>
				</EnterTransition>
			</section>
			<Confetti />
		</>
	)
}
export default FinishExam
