import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
	const error = useRouteError() as any
	console.error(error)

	return (
		<div className='text-center min-h-screen tracking-tight bg-slate-900 flex items-center justify-center flex-col gap-4 font-medium'>
			<h1 className='text-gray-200 font-bold text-7xl'>Oops!</h1>
			<p className='text-slate-400 max-w-xl mb-4'>{error?.message || "404 Page not found"}</p>
		</div>
	)
}
