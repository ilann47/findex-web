import { PropsWithChildren } from 'react'

import { Stack, StackProps } from '@mui/material'

export const StyledContainer = ({ children, ...stackProps }: PropsWithChildren & StackProps) => {
	return (
		<Stack bgcolor='#FFF' p={2} gap={3} width='100%' {...stackProps}>
			{children}
		</Stack>
	)
}
