import { Stack, StackProps, styled } from '@mui/material'

import { transientOptions } from '@/utils/transient-options'

interface FileContainerProps {
	$isDragging: boolean
	$isFocused: boolean
}

export const FileInputContainer = styled(
	Stack,
	transientOptions
)<FileContainerProps>(({ theme, $isDragging, $isFocused }) => ({
	border: `2px dashed ${theme.palette.juicy.neutral[40]}`,
	alignItems: 'center',
	gap: theme.spacing(2),
	padding: theme.spacing(3),
	cursor: 'pointer',
	marginBottom: theme.spacing(1),
	...($isDragging && {
		background: theme.palette.juicy.primary[10],
		border: `2px solid ${theme.palette.juicy.primary[60]}`,
		'& .MuiStack-root': {
			background: theme.palette.juicy.primary[20],
			'& svg': {
				fill: theme.palette.juicy.primary[60],
			},
		},
	}),
	...($isFocused && { border: `2px dashed ${theme.palette.juicy.primary[60]}` }),
}))

export const IconContainer = styled(Stack)<StackProps>(({ theme }) => ({
	background: theme.palette.juicy.neutral[30],
	alignItems: 'center',
	justifyContent: 'center',
	padding: theme.spacing(1.5),
	borderRadius: '100%',

	'& svg': {
		fill: theme.palette.juicy.neutral[90],
	},
}))
