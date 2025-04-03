import { Skeleton, Stack } from '@mui/material'

import { TablePaginationSkeleton } from './pagination'
import { TableControlsSkeleton } from '../../table-controls/skeleton'
import { StyledContainer } from '@/components/ui/container'

const TableSkeleton = () => {
	return (
		<StyledContainer>
			<Stack gap={2}>
				<TableControlsSkeleton />
				<Skeleton variant='rectangular' sx={{ height: (theme) => theme.spacing(40) }} />

				<TablePaginationSkeleton />
			</Stack>
		</StyledContainer>
	)
}

export default TableSkeleton
