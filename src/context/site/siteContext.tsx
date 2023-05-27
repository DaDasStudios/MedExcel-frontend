import {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react"
import { ISite, ISiteInformation } from "../../interface"
import { getSiteData } from "../../lib/site.request"
import { useAuthContext } from "../auth/authContext"
import { siteReducer, SiteTypes } from "./siteReducer"

const SiteContext = createContext({} as ISiteInformation & ISite)

SiteContext.displayName = "Site Information"

export const useSiteContext = () => useContext(SiteContext)

const siteInitialState: ISiteInformation = {
	image: {
		url: "",
	},
	name: "",
	subscriptionPlans: []
}


export const SiteContextProvider = ({ children }: PropsWithChildren) => {
	const { auth } = useAuthContext()
	const [state, dispatch] = useReducer(siteReducer, siteInitialState)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [modalChildren, setModalChildren] = useState(<></>)

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
				modal: {
					close() {
						setModalChildren(<></>)
						setIsOpenModal(false)
					},
					isOpen: isOpenModal,
					open(children) {
						setModalChildren(children)
						setIsOpenModal(true)
					},
					children: modalChildren
				}
			}}
		>
			{children}
		</SiteContext.Provider>
	)
}
