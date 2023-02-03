import {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
	useEffect,
} from "react"
import { ISite } from "../../interface"
import { getSiteData } from "../../lib/site.request"
import { useAuthContext } from "../auth/authContext"
import { siteReducer, SiteTypes } from "./siteReducer"

const SiteContext = createContext({} as ISite)
SiteContext.displayName = "Site Information"

export const useSiteContext = () => useContext(SiteContext)

const siteInitialState: ISite = {
	image: {
		url: "",
	},
	name: "",
	subscriptionPlans: [],
}

export const SiteContextProvider = ({ children }: PropsWithChildren) => {
	const { auth } = useAuthContext()
	const [state, dispatch] = useReducer(siteReducer, siteInitialState)

	useEffect(() => {
		;(async () => {
			const { data } = await getSiteData()
			if (auth.user) {
				dispatch({
					type: SiteTypes.SET,
					payload: data,
				})
			} else {
				dispatch({
					type: SiteTypes.SET,
					payload: {
						...data,
						subscriptionPlans: [
							{
								_id: "free-subscription-plan-id",
								name: "Free",
								days: 14,
								price: 0,
								description:
									"Free trial for two weeks, just you need to sign up then ready to start exams",
								createdAt: new Date(),
								updatedAt: new Date(),
							},
							...data.subscriptionPlans.sort(
								(a, b) => a.price - b.price
							),
						],
					},
				})
			}
		})()
	}, [auth.user])

	return (
		<SiteContext.Provider
			value={{
				...state,
			}}
		>
			{children}
		</SiteContext.Provider>
	)
}
