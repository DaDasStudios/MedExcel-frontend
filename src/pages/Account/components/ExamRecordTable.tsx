import { Link } from "react-router-dom"
import { themeBtns } from "../../../components/ui/Buttons/SolidButton"
import { useAuthContext } from "../../../context/auth/authContext"
import { formatDate } from "../../../utils/date"

const ExamRecordTable = () => {
	const {
		auth: { user },
	} = useAuthContext()
	const records = user?.exam.scoresHistory

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
								className='px-6 py-4 font-medium whitespace-nowrap'
							>
								{record.score.toFixed(0)}%
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
								className="w-6"
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
