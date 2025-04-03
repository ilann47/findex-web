import { Backdrop, CircularProgress } from '@mui/material'

const BackdropLoading = () => {
	return (
		<Backdrop
			sx={{
				color: '#fff',
				zIndex: (theme) => theme.zIndex.modal + 10,
			}}
			open={true}
		>
			<CircularProgress color='inherit' />
		</Backdrop>
	)
}

export default BackdropLoading
