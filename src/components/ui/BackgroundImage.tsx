interface IProps {
	url: string
}

const BackgroundImage = ({ url }: IProps) => {
	console.log(url)
	return (
		<span
      style={{
        backgroundImage: `url('${url}')`
      }}
			className={`fixed bg-no-repeat bg-cover min-h-screen -z-20 inset-0 blur-sm`}
		></span>
	)
}

export default BackgroundImage
