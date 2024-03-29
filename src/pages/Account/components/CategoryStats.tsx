import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { XAxis, YAxis, BarChart, CartesianGrid, Bar } from "recharts"
import Spin from "../../../components/ui/Spin"
import { useAuthContext } from "../../../context/auth/authContext"
import { getGeneralPerformanceRequest } from "../../../lib/user.request"
import { neutralChartTheme } from "../../../utils/charts"
import { toTitle } from "../../../utils/string"
import { Input } from "../../../components/ui/Input"

interface IChartStats {
	name: string
	count: number
}

const CategoryStats = () => {
	const { auth } = useAuthContext()

	const [stats, setStats] = useState(null as IChartStats[] | null)
	const [loading, setLoading] = useState(true)
	const [bestCategory, setBestCategory] = useState("")
	const [worstCategory, setWorstCategory] = useState("")

	async function getStats() {
		try {
			setLoading(true)
			const res = await getGeneralPerformanceRequest(auth.id || "", auth.token || "")

			if (res.data.status === "CORRECT") {
				const payload: IChartStats[] = Object.entries(res.data.statistics.categoriesPerformance).map(
					([name, value]) => {
						return {
							name: toTitle(name),
							count: value.count,
						}
					}
				)
				setStats(payload)
				setBestCategory(res.data.statistics.bestCategory)
				setWorstCategory(res.data.statistics.worstCategory)
			}
		} catch (error: any) {
			switch (error.response.status) {
				case 500:
					toast.error("Something went wrong during stats calculation")
					break
				case 404:
					setStats([])
					break

				default:
					break
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getStats()
	}, [auth.user?.subscription])

	if (loading) {
		return (
			<div className='flex items-center justify-center'>
				<Spin />
			</div>
		)
	}

	return (
		<div>
			{stats && stats.length > 0 ? (
				<>
					<h3 className='text-base text-slate-300 font-medium mb-6'>Performance in categories</h3>
					<BarChart className='max-md:hidden' width={450} height={300} data={stats}>
						<CartesianGrid strokeDasharray={10} stroke={neutralChartTheme.backgroundColor} />
						<YAxis stroke={neutralChartTheme.borderColor} />
						<XAxis dataKey='name' stroke={neutralChartTheme.borderColor} tickCount={4} fontSize={14} />
						<Bar
							dataKey='count'
							fill={neutralChartTheme.backgroundColor}
							stroke={neutralChartTheme.borderColor}
						/>
					</BarChart>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'>
						<Input
							id='bestCategory'
							label='Best Category'
							name='bestCategory'
							value={toTitle(bestCategory)}
						/>
						<Input
							id='worstCategory'
							label='Worst Category'
							name='worstCategory'
							value={toTitle(worstCategory)}
						/>
					</div>
				</>
			) : (
				<p className='font-medium text-2xl text-center text-slate-300 underline mb-4'>
					Don't have questions to analyze
				</p>
			)}
		</div>
	)
}
export default CategoryStats
