import { Skeleton, Stack } from '@mui/material'

import { IconSkeleton } from '@/components/ui/feedback/skeleton/icon'

export const InstrumentCheckboxLoading = () => {
	return (
		<Stack sx={{ height: (theme) => theme.spacing(6) }} direction='row' gap={3} alignItems='center'>
			<IconSkeleton />
			<Skeleton
				sx={{
					width: (theme) => theme.spacing(10),
					height: (theme) => theme.spacing(4),
				}}
			/>
			<Skeleton sx={{ width: (theme) => theme.spacing(5), height: (theme) => theme.spacing(4) }} />
		</Stack>
	)
}
