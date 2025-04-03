import { Skeleton } from '@mui/material'

export const IconSkeleton = () => {
	return (
		<Skeleton variant='rounded' sx={{ width: (theme) => theme.spacing(3), height: (theme) => theme.spacing(3) }} />
	)
}
