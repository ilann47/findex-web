import { PropsWithChildren } from 'react'

import { Stack } from '@mui/material'

export const ViewLayoutHeader = ({ children }: PropsWithChildren) => {
	return (
		<Stack direction='row' justifyContent='space-between'>
			{children}
		</Stack>
	)
}
