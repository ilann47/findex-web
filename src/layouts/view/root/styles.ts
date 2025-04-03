import { Stack, StackProps, styled } from '@mui/material'

import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/layout'

export interface ViewContainerProps extends StackProps {
	iscollapsed: 1 | 0
}

export const ViewContainer = styled(Stack)<ViewContainerProps>(({ iscollapsed, theme }) => ({
	marginTop: HEADER_HEIGHT,
	marginLeft: iscollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
	padding: theme.spacing(3),
	gap: theme.spacing(3),
	width: '100%',
}))
