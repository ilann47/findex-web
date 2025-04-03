import { Stack } from '@mui/material'

import Loading from '..'

const FullHeightLoading: React.FC = () => {
	return (
		<Stack width='100%' height='100vh' justifyContent='center' alignContent='center'>
			<Loading />
		</Stack>
	)
}

export default FullHeightLoading
