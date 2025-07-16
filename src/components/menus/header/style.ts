import { Stack, styled } from '@mui/material'

import { HEADER_HEIGHT } from '@/constants/layout'

export const HeaderContainer = styled(Stack)(({ theme }) => ({
	background: theme.palette.juicy.neutral[100],
	height: HEADER_HEIGHT,
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	zIndex: 20,
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: `0 ${theme.spacing(3)}`,
	flexDirection: 'row',
}))
