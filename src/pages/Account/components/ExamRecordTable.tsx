import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import { BarChart, CartesianGrid, YAxis, XAxis, Bar } from "recharts"
import { themeBtns } from "../../../components/ui/Buttons/SolidButton"
import Tooltip from "../../../components/ui/Tooltip"
import { useAuthContext } from "../../../context/auth/authContext"
import { IScoresHistory } from "../../../interface/user"
import { getSpecificPerformanceRequest } from "../../../lib/user.request"
import { neutralChartTheme } from "../../../utils/charts"
import { formatDate } from "../../../utils/date"
import { toTitle } from "../../../utils/string"

interface IProps {
	setShowChartModal: React.Dispatch<React.SetStateAction<boolean>>
	setModalChildren: React.Dispatch<
		React.SetStateAction<
			| string
			| number
			| boolean
			| React.ReactElement<any, string | React.JSXElementConstructor<any>>
			| React.ReactFragment
			| React.ReactPortal
			| null
			| undefined
		>
	>
}

const ExamRecordTable = ({ setShowChartModal, setModalChildren }: IProps) => {
	const { auth } = useAuthContext()
	const { user } = auth

	const records = user?.exam.scoresHistory

	async function displayChart(record: IScoresHistory) {
		try {
			const res = await getSpecificPerformanceRequest(
				record.correctAnswers,
				auth.id || "",
				auth.token || ""
			)

			if (res.data.status !== "CORRECT") {
				return toast.error("Something went wrong")
			}

			setShowChartModal(true)
			setModalChildren(
				<div className='grid'>
					<h3 className='text-center text-slate-300 font-medium mb-6'>
						Exam date at {formatDate.format(new Date(record.startedAt))} - Performance in categories
					</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
						<div className='flex flex-col gap-3 mb-6 tracking-tight'>
							<label className='text-base text-slate-300 font-medium'>Best Category</label>
							<input
								className={`bg-transparent border-2 border-slate-100/10 rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent `}
								defaultValue={toTitle(res.data.statistics.bestCategory)}
								readOnly
							/>
						</div>
						<div className='flex flex-col gap-3 mb-6 tracking-tight'>
							<label className='text-base text-slate-300 font-medium'>Worst Category</label>
							<input
								className={`bg-transparent border-2 border-slate-100/10 rounded-md text-slate-300 py-3 px-4 placeholder:text-slate-400 outline-none focus:outline-none placeholder:tracking-tight focus-within:bg-transparent `}
								defaultValue={toTitle(res.data.statistics.worstCategory)}
								readOnly
							/>
						</div>
					</div>
					<BarChart
						className='max-md:hidden justify-self-center -ml-[40px]'
						width={450}
						height={300}
						data={Object.entries(res.data.statistics.categoriesPerformance).map(stat => {
							return {
								name: toTitle(stat[0]),
								count: stat[1].count,
							}
						})}
					>
						<CartesianGrid strokeDasharray={10} stroke={neutralChartTheme.backgroundColor} />
						<YAxis stroke={neutralChartTheme.borderColor} />
						<XAxis dataKey='name' stroke={neutralChartTheme.borderColor} tickCount={4} fontSize={14} />
						<Bar
							dataKey='count'
							fill={neutralChartTheme.backgroundColor}
							stroke={neutralChartTheme.borderColor}
						/>
					</BarChart>
				</div>
			)
		} catch (error: any) {
			if (error.response.data.status === "NOT_FOUND_QUESTIONS" ){
				toast.error("Not found questions")
			} else {
				toast.error("Could not display chart")
			}
		}
	}

	return (
		<div className='relative overflow-x-auto shadow-md rounded-md mb-6 border border-slate-100/10'>
			<table className='w-full text-sm text-left text-slate-400 dark:text-gray-400'>
				<thead className='text-xs text-slate-400 uppercase bg-slate-900/50'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							Score
						</th>
						<th scope='col' className='px-6 py-3'>
							Questions
						</th>
						<th scope='col' className='px-6 py-3'>
							Date
						</th>
						<th scope='col' className='px-6 py-3'>
							Time
						</th>
					</tr>
				</thead>
				<tbody>
					{records?.map(record => (
						<tr
							key={record.startedAt.toString()}
							className='bg-slate-800/50'
						>
							<th
								scope='row'
								className='px-6 py-4 font-medium whitespace-nowrap flex gap-x-2 items-center'
							>
								{record.score.toFixed(0)}%
								<Tooltip message='View chart'>
									<button
										onClick={() => displayChart(record)}
										className={
											themeBtns.neutralBtn +
											" p-px rounded-md"
										}
										type='button'
									>
										<span>
											<svg
												className='w-5'
												fill='none'
												stroke='currentColor'
												strokeWidth={1.5}
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
												aria-hidden='true'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z'
												/>
											</svg>
										</span>
									</button>
								</Tooltip>
							</th>
							<td className='px-6 py-4'>
								{record.questions.length}
							</td>
							<td className='px-6 py-4'>
								{formatDate.format(new Date(record.startedAt))}
							</td>
							<td className='px-6 py-4'>
								{(
									(new Date(record.finishedAt).getTime() -
										new Date(record.startedAt).getTime()) /
									60000
								).toFixed(2)}{" "}
								Minutes
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{records?.length === 0 && (
				<>
					<div className='m-6 flex flex-col items-center gap-y-3'>
						<p className='font-medium text-2xl text-center text-slate-300 underline'>
							No records yet
						</p>
						<Link
							to={"/exam"}
							className={
								themeBtns.blueBtn +
								" rounded-md p-3 flex justify-center items-center gap-x-2 mt-2"
							}
						>
							<svg
								className='w-6'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
								/>
							</svg>
							Let's start
						</Link>
					</div>
				</>
			)}
		</div>
	)
}

export default ExamRecordTable
