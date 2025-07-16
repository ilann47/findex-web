import { ReactNode } from 'react'

import { ChevronDown, DocumentExport } from '@carbon/icons-react'
import { DragEndEvent } from '@dnd-kit/core'
import { Skeleton, Stack, StackProps } from '@mui/material'
import { Column } from '@tanstack/react-table'

import CleanFiltersButton from './clean-filters-button'
import { ColumnsControls } from './columns-controls'
import DropdownButton from '@/components/ui/inputs/dropdown-button'

interface TableControlsProps<T> extends StackProps {
	columns: Column<T, unknown>[]
	changeOrder: (event: DragEndEvent) => void
	downloadSpreadSheet: () => void
	downloadReport: () => void
	disableExport?: boolean
	endControls?: ReactNode
	isLoading?: boolean
}

export const TableControls = <T extends object>({
	columns,
	changeOrder,
	downloadReport,
	downloadSpreadSheet,
	disableExport,
	endControls,
	isLoading,
}: TableControlsProps<T>) => {
	if (isLoading) {
		return (
			<Stack direction='row' justifyContent='space-between' gap={1}>
				<Stack direction='row' gap={1}>
					<ColumnsControls changeOrder={changeOrder} columns={columns} />

					<CleanFiltersButton />
				</Stack>

				<Skeleton
					variant='rectangular'
					sx={{ height: (theme) => theme.spacing(4), width: (theme) => theme.spacing(40) }}
				/>
			</Stack>
		)
	}

	return (
		<Stack direction='row' justifyContent='space-between' gap={1}>
			<Stack direction='row' gap={1}>
				<ColumnsControls changeOrder={changeOrder} columns={columns} />

				<CleanFiltersButton />
			</Stack>

			<DropdownButton
				title='export'
				variant='outlined'
				size='small'
				startIcon={<DocumentExport />}
				endIcon={<ChevronDown />}
				sx={{ marginLeft: 'auto' }}
				options={[
					{
						label: 'pdf',
						onClick: downloadReport,
					},
					{
						label: 'xls',
						onClick: downloadSpreadSheet,
					},
				]}
				disabled={disableExport}
			/>
			{endControls}
		</Stack>
	)
}

export default TableControls
