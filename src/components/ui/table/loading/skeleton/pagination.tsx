import { Skeleton, Stack, StackProps } from '@mui/material'

export const TablePaginationSkeleton = (props: StackProps) => {
	return (
		<Stack alignItems='end' {...props}>
			<Skeleton
				variant='rectangular'
				sx={{ height: (theme) => theme.spacing(3), width: (theme) => theme.spacing(55) }}
			/>
		</Stack>
	)
}
