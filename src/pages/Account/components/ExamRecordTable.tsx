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
						<th
							scope='col'
							className='px-6 py-3'
						>
							Score
						</th>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Questions
						</th>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Date
						</th>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Time
						</th>
					</tr>
				</thead>
				<tbody>
					{records?.map(record => (
						<tr key={record.startedAt.toString()} className='bg-slate-800/50'>
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
		</div>
	)
}

export default ExamRecordTable
