import { PropsWithChildren } from 'react'

import { GridProps } from '@mui/material'

import { GridContainer } from '.'
import { StyledContainer } from '..'

export const StyledGridContainer = ({ children, ...rest }: PropsWithChildren & GridProps) => {
	return (
		<StyledContainer>
			<GridContainer {...rest}>{children}</GridContainer>
		</StyledContainer>
	)
}
