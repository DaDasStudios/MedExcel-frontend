import { Toast, toast } from "react-hot-toast"
import { Link } from "react-router-dom"

const ExpiredSubscriptionPlanToast = ({ t }: { t: Toast }) => {
	return (
		<div>
			<p>
				Your subscription plan <span className='italic'>has expired</span>
			</p>
			<Link
				className='text-green-600 text-center block hover:underline font-medium border bg-green-100/50 hover:bg-green-100 transition-colors rounded-lg border-transparent mt-1 py-px'
				to='/subscription'
				onClick={() => toast.remove(t.id)}
			>
				Renew plan
			</Link>
		</div>
	)
}
export default ExpiredSubscriptionPlanToast
