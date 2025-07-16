import { Stack } from '@mui/material'

import Warning, { WarningProps } from '@/components/ui/feedback/warning'

const ErrorPage = (props: WarningProps) => {
	return (
		<Stack justifyContent='center' minWidth='100vw' minHeight='100vh' alignItems='center'>
			<Warning button {...props} />
		</Stack>
	)
}

export default ErrorPage
