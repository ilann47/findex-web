import { PropsWithChildren } from 'react'

import { Grid, GridProps } from '@mui/material'

export const GridContainer = ({ children, ...rest }: PropsWithChildren & GridProps) => {
	return (
		<Grid container columns={5} spacing={3} {...rest}>
			{children}
		</Grid>
	)
}
