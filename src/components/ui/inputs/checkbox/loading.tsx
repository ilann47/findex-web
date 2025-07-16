import { Skeleton, Stack } from '@mui/material'

import { IconSkeleton } from '@/components/ui/feedback/skeleton/icon'

export const CheckboxLoading = () => {
	return (
		<Stack sx={{ height: (theme) => theme.spacing(6) }} direction='row' gap={3} alignItems='center'>
			<IconSkeleton />
			<Stack>
				<Skeleton
					sx={{
						width: (theme) => theme.spacing(10),
						height: (theme) => theme.spacing(3),
					}}
				/>
				<Skeleton sx={{ width: (theme) => theme.spacing(20), height: (theme) => theme.spacing(3) }} />
			</Stack>
		</Stack>
	)
}
