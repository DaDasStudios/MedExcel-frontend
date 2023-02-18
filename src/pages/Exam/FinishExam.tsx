import { Link } from "react-router-dom"
import SolidButton, { themeBtns } from "../../components/ui/Buttons/SolidButton"
import Separator from "../../components/ui/Separator"
import { useExamContext } from "../../context/exam/examContext"
import { ComponentElement } from "../../interface"
import { formatDateDetailed } from "../../utils/date"

const FinishExam = () => {
	const { scoresHistory: currentScore } = useExamContext()
	return (
		<div className='flex flex-col gap-3 font-medium'>
			<h1 className='text-gray-200 text-center font-bold text-4xl'>
				Congratulations 🎉
			</h1>
			<p className='text-gray-400 mt-3 text-lg text-center'>
				You completed the whole exam so you can see your exams records
				in your{" "}
				<Link to={"/account"} className='hover:underline text-gray-300'>
					account section
				</Link>{" "}
				at the bottom.
			</p>
			<p className='text-gray-400 mt-3 text-lg text-center'>
				Let's take a look at your results
			</p>
			<div className='my-3'>
				<h2 className='text-center text-gray-200 font-bold text-3xl'>
					Got {currentScore.score.toFixed(0)}% in{" "}
					{(
						(new Date(currentScore.finishedAt).getTime() -
							new Date(currentScore.startedAt).getTime()) /
						(1000 * 60)
					).toFixed(1)}{" "}
					minutes
				</h2>
				<div className='grid grid-cols-2 gap-3 justify-around mt-6'>
					<h3 className='text-center text-gray-300 text-lg font-semibold tracking-tight'>
						<span className='block'>Started at</span>
						<span>
							{formatDateDetailed.format(
								new Date(currentScore.startedAt)
							)}
						</span>
					</h3>
					<h3 className='text-center text-gray-300 text-lg font-semibold tracking-tight'>
						<span className='block'>Finished at</span>
						<span>
							{formatDateDetailed.format(
								new Date(currentScore.finishedAt)
							)}
						</span>
					</h3>
				</div>
			</div>
			<Separator />
			<div className='flex items-center justify-between gap-6'>
				<p className='text-sm text-gray-400'>
					Only users with an actived subscription plan can see their
					exam records.
				</p>
				<SolidButton
					onClick={() => {
						window.location.replace("/account")
					}}
					as={ComponentElement.BUTTON}
					theme={themeBtns.greenBtn}>
					<div className='flex items-center gap-3'>
						<svg
							className='w-6'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								clipRule='evenodd'
								fillRule='evenodd'
								d='M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
							/>
						</svg>
						Continue
					</div>
				</SolidButton>
			</div>
		</div>
	)
}
export default FinishExam
