import { Skeleton, Stack } from '@mui/material'

export const TableControlsSkeleton = () => {
	return (
		<Stack direction='row' justifyContent='space-between' gap={1}>
			<Skeleton
				variant='rectangular'
				sx={{ height: (theme) => theme.spacing(4), width: (theme) => theme.spacing(14) }}
			/>
			<Skeleton
				variant='rectangular'
				sx={{ height: (theme) => theme.spacing(4), width: (theme) => theme.spacing(40) }}
			/>
		</Stack>
	)
}
