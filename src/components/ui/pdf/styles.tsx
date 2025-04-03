import { Stack, StackProps, styled } from '@mui/material'

export const PdfContainer = styled(Stack)<StackProps>(({ theme }) => ({
	position: 'relative',
	'& .tools': {
		position: 'absolute',
		bottom: theme.spacing(2),
		left: '50%',
		transform: 'translateX(-50%)',
		opacity: 0,
		transition: 'opacity 0.3s ease-in-out',
		zIndex: 10,
	},
	'&:hover .tools': {
		opacity: 1,
	},
}))
