import { useEffect, useState } from "react"
import Spin from "../../../../components/ui/Spin"
import { getSiteData } from "../../../../lib/site.request"

interface IProps {
	imageUrl: string
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

const CurrentImage = ({ imageUrl, setImageUrl }: IProps) => {
	useEffect(() => {
		;(async () => {
			const { data } = await getSiteData()
			if (data.image) {
				setImageUrl(data.image.url)
			}
		})()
	}, [])
	return (
		<div className='relative rounded-md overflow-hidden border border-gray-100/10 flex items-center justify-center bg-gray-50/5 group'>
			{imageUrl ? (
				<>
					<span className='absolute z-10 inset-0 bg-slate-900/50 flex flex-col gap-2 pointer-events-none items-center justify-center group-hover:pointer-events-auto opacity-0 transition-opacity group-hover:opacity-100'>
						<h5 className='text-3xl text-gray-100 font-bold tracking-tight'>
							MedExcel current logo
						</h5>
                        <p>Upload a new image to see see changes</p>
					</span>
					<img
						className='max-w-sm group-hover:blur-sm'
						src={imageUrl}
						alt='MedExcel current logo'
					/>
				</>
			) : (
				<Spin />
			)}
		</div>
	)
}

export default CurrentImage
