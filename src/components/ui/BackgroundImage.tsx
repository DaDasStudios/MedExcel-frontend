interface IProps {
	url: string
}

const BackgroundImage = ({ url }: IProps) => {
	return (
		<span
			role='banner'
			aria-hidden={true}
			style={{
				backgroundImage: `url('${url}')`,
			}}
			className={`fixed bg-no-repeat bg-cover min-h-screen -z-20 inset-0 blur-sm bg-gray-700`}
		></span>
	)
}

export default BackgroundImage

