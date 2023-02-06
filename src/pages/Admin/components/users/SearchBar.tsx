import { Formik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { Form } from "react-router-dom"
import Spin from "../../../../components/ui/Spin"
import { useAdminContext } from "../../../../context/admin/adminContext"
import { IUser } from "../../../../interface/user"
import { getUsersByFilterRequest } from "../../../../lib/admin.request"

interface ISearchBarProps {
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

function SearchBar({ setUsers }: ISearchBarProps) {
	const {
		auth: { token },
	} = useAdminContext()
	const [showFilter, setShowFilter] = useState(false)
	return (
		<Formik
			initialValues={{
				username: "",
			}}
			onSubmit={async (values, helpers) => {
				try {
					const res = await getUsersByFilterRequest(
						"username",
						values.username,
						token
					)
					if (res.status === 200 && res.data.users) {
						setUsers(res.data.users)
					}
				} catch (error: any) {
					toast.error("Something went wrong")
				} finally {
					helpers.setSubmitting(false)
				}
			}}>
			{({ isSubmitting, values, setValues }) => (
				<Form className='flex gap-2 items-center'>
					<input
						placeholder='Search for users by name'
						className='focus:outline-none p-3 rounded-md shadow-md bg-slate-700 font-normal placeholder:font-normal w-96'
						type='text'
						name='username'
						value={values.username}
						onChange={e =>
							setValues({
								username: e.target.value,
							})
						}
					/>
					{isSubmitting ? (
						<Spin />
					) : (
						<div className='flex gap-1'>
							<button
								type='submit'
								className='p-2 rounded-md hover:text-gray-200 hover:bg-gray-700'>
								<svg
									className='w-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
									/>
								</svg>
							</button>
							<button
								className='p-2.5 rounded-md hover:text-gray-200 hover:bg-gray-700 relative'
								type='button'
								onClick={() => {
									setShowFilter(!showFilter)
								}}>
								<svg
									className='w-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'>
									<path d='M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z' />
								</svg>
								<div
									className={`${
										showFilter
											? "flex gap-2 flex-col"
											: "hidden"
									} p-3.5 rounded-md text-gray-300 bg-slate-800 border border-gray-100/10 text-center absolute h-fit w-fit whitespace-nowrap left-1/2 right-1/2 -translate-x-1/2 -bottom-40 z-20`}>
									<div
										className='flex gap-2.5 items-center hover:underline'
										onClick={() => {
											setUsers(users =>
												users.filter(
													user =>
														user.subscription
															?.hasSubscription
												)
											)
										}}>
										<svg
											className='w-4'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'>
											<path
												clipRule='evenodd'
												fillRule='evenodd'
												d='M19 5.5a4.5 4.5 0 01-4.791 4.49c-.873-.055-1.808.128-2.368.8l-6.024 7.23a2.724 2.724 0 11-3.837-3.837L9.21 8.16c.672-.56.855-1.495.8-2.368a4.5 4.5 0 015.873-4.575c.324.105.39.51.15.752L13.34 4.66a.455.455 0 00-.11.494 3.01 3.01 0 001.617 1.617c.17.07.363.02.493-.111l2.692-2.692c.241-.241.647-.174.752.15.14.435.216.9.216 1.382zM4 17a1 1 0 100-2 1 1 0 000 2z'
											/>
										</svg>
										Only with actived plan
									</div>
									<div
										className='flex gap-2.5 items-center hover:underline'
										onClick={() =>
											setUsers(users =>
												users
													.filter(
														user =>
															user.exam
																.scoresHistory
																.length > 0
													)
													.sort(
														(a, b) =>
															a.exam
																.scoresHistory[0]
																?.score +
															b.exam
																.scoresHistory[0]
																?.score
													)
											)
										}>
										<svg
											className='w-4'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'>
											<path
												clipRule='evenodd'
												fillRule='evenodd'
												d='M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z'
											/>
										</svg>
										With maximum score
									</div>
									<div
										className='flex gap-2.5 items-center hover:underline'
										onClick={() =>
											setUsers(users =>
												users
													.filter(
														user =>
															user.exam
																.scoresHistory
																.length > 0
													)
													.sort(
														(a, b) =>
															a.exam
																.scoresHistory[0]
																?.score -
															b.exam
																.scoresHistory[0]
																?.score
													)
											)
										}>
										<svg
											className='w-4'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'>
											<path
												clipRule='evenodd'
												fillRule='evenodd'
												d='M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z'
											/>
										</svg>
										With minimum score
									</div>
									<div
										className='flex gap-2.5 items-center hover:underline'
										onClick={() =>
											window.location.reload()
										}>
										<svg
											className='w-4'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											aria-hidden='true'>
											<path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z' />
											<path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z' />
											<path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z' />
										</svg>
										No filter
									</div>
								</div>
							</button>
						</div>
					)}
				</Form>
			)}
		</Formik>
	)
}

export default SearchBar
