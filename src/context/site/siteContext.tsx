import {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
	useEffect,
} from "react"
import { ISite } from "../../interface"
import { getSiteData } from "../../lib/site.request"
import { siteReducer, SiteTypes } from "./siteReducer"

const SiteContext = createContext(
	{} as ISite
)
SiteContext.displayName = "Site Information"

export const useSiteContext = () => useContext(SiteContext)

const siteInitialState: ISite = {
	image: {
        url: ""
    },
	name: "",
	subscriptionPlans: [],
}

export const SiteContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(siteReducer, siteInitialState)

	useEffect(() => {
		;(async () => {
			const { data } = await getSiteData()
            dispatch({ type: SiteTypes.SET, payload: data })
		})()
	}, [])

	return (
		<SiteContext.Provider
			value={{
				...state
			}}
		>
			{children}
		</SiteContext.Provider>
	)
}
