import { Stack, StackProps, styled, toggleButtonClasses } from '@mui/material'
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup'

import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/layout'

export interface SidebarContainerProps extends StackProps {
	iscollapsed: 1 | 0
}

export const SidebarContainer = styled(Stack)<SidebarContainerProps>(({ theme, iscollapsed }) => ({
	background: theme.palette.juicy.neutral[90],
	height: '100vh',
	width: SIDEBAR_WIDTH,
	...(iscollapsed && { width: SIDEBAR_COLLAPSED_WIDTH }),
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	zIndex: 10,
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	pointerEvents: 'auto',
}))

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
	marginTop: HEADER_HEIGHT,
	paddingTop: theme.spacing(3),
	display: 'flex',
	pointerEvents: 'auto',

	'& svg': {
		fill: theme.palette.juicy.neutral[50],
		color: theme.palette.juicy.neutral[50],
	},

	[`& .${toggleButtonClasses.root}`]: {
		color: theme.palette.juicy.neutral[50],
		fontWeight: 300,
		pointerEvents: 'auto',
		cursor: 'pointer',
	},

	'& .MuiButtonBase-root.Mui-selected': {
		color: theme.palette.juicy.primary[50],
		background: theme.palette.juicy.neutral[80],
		fontWeight: 500,

		'& svg': {
			fill: theme.palette.juicy.primary[50],
			color: theme.palette.juicy.primary[50],
		},

		'&::before': {
			content: '""',
			width: theme.spacing(0.5),
			height: '100%',
			background: theme.palette.juicy.primary[50],
			position: 'absolute',
			left: 0,
		},
	},
}))
