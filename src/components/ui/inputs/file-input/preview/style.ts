import { Stack, StackProps, styled } from '@mui/material'

export const PreviewContainer = styled(Stack)<StackProps>(({ theme }) => ({
	position: 'relative',
	padding: theme.spacing(1),
	border: `2px dashed ${theme.palette.juicy.neutral[40]}`,
	'& img': {
		objectFit: 'cover',
		overflow: 'hidden',
	},
	'& .remove-button': {
		position: 'absolute',
		top: theme.spacing(2),
		right: theme.spacing(2),
		opacity: 0,
		transition: 'opacity 0.3s ease-in-out',
		zIndex: 10,
	},
	'&:hover .remove-button': {
		opacity: 1,
	},
}))
