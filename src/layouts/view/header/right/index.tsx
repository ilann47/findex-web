import { Children } from 'react'

import { Skeleton, Stack, StackProps } from '@mui/material'

import { theme } from '@/theme'

interface Props extends StackProps {
	isLoading?: boolean
}

export const ViewLayoutHeaderRightElements = ({ children, isLoading, ...props }: Props) => {
	return (
		<Stack direction='row' justifyContent='center' alignItems='center' gap={2} {...props}>
			{isLoading ? (
				<Skeleton variant='rectangular' width={theme.spacing(48)} height={theme.spacing(4)} />
			) : (
				Children.map(children, (child) => child)
			)}
		</Stack>
	)
}
