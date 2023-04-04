import {
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	AreaChart,
	Legend,
} from "recharts"
import { useAuthContext } from "../../../context/auth/authContext"
import { blueChartTheme, greenChartTheme, neutralChartTheme } from "../../../utils/charts"
import { formatDate } from "../../../utils/date"

interface IProps {}

interface IScoresChart {
	name: string
	score: number
	average: number
}

const GeneralStats = ({}: IProps) => {
	const {
		auth: { user },
	} = useAuthContext()

	if (user?.exam.scoresHistory.length === 0) {
		return <></>
	}
	
	const scoresChart: IScoresChart[] = [] 
	let scoresSum = 0
	let counter = 0

	if (user) {
		for (const record of user.exam.scoresHistory) {
			scoresSum += record.score
			counter++

			scoresChart.push({
				name: formatDate.format(new Date(record.startedAt)).toString(),
				score: record.score,
				average: scoresSum / counter,
			})
		}
	}
			
	return (
		<div className='grid grid-cols-1 items-center my-4'>
			<h3 className='text-base text-slate-300 font-medium mb-6'>
				Performance in exams
			</h3>
			<AreaChart
				className='max-md:hidden'
				width={450}
				height={300}
				data={scoresChart}
			>
				<Area
					name='Score'
					type='monotone'
					dataKey='score'
					stroke={blueChartTheme.textColor}
					fillOpacity={1}
					fill={blueChartTheme.backgroundColor}
				/>
				<Area
					name='Average'
					type='monotone'
					dataKey='average'
					stroke={greenChartTheme.textColor}
					fillOpacity={1}
					fill={greenChartTheme.backgroundColor}
				/>
				<Legend/>
				<CartesianGrid
					strokeDasharray={10}
					stroke={neutralChartTheme.backgroundColor}
				/>
				<XAxis
					dataKey='name'
					stroke={neutralChartTheme.borderColor}
					tickCount={3}
					fontSize={14}
				/>
				<YAxis fontSize={14} stroke={neutralChartTheme.borderColor} />
				<Tooltip
					contentStyle={{
						borderRadius: "8px",
						backgroundColor: neutralChartTheme.backgroundColor,
						color: neutralChartTheme.textColor,
						border: "none",
					}}
					wrapperStyle={{
						outline: "none",
						border: "none",
					}}
					formatter={(value, name, props) =>
						(value as number).toFixed(2)
					}
					labelFormatter={label => "Date : " + label}
				/>
			</AreaChart>
			<span className='hidden max-md:block justify-self-center'>
				<h3 className='text-center font-medium text-xl text-slate-300 underline px-6 pb-4'>
					Charts aren't supported in your screen size
				</h3>
			</span>
		</div>
	)
}
export default GeneralStats
