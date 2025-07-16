import { TableSplit } from '@carbon/icons-react'
import { DragEndEvent } from '@dnd-kit/core'
import { Column } from '@tanstack/react-table'

import SortableList from '../../sortable-list'
import { Button } from '@/components/ui/inputs/button'
import Popover, { openPopover, usePopover } from '@/components/ui/popover'

interface TableControlsProps<T> {
	columns: Column<T, unknown>[]
	changeOrder: (event: DragEndEvent) => void
}

export const ColumnsControls = <T extends object>({ columns, changeOrder }: TableControlsProps<T>) => {
	const columnsPopover = usePopover()

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				startIcon={<TableSplit />}
				onClick={(e) => openPopover(columnsPopover)(e.currentTarget)}
				label='table.columns'
			/>
			<Popover ref={columnsPopover}>
				<SortableList items={columns} changeOrder={changeOrder} />
			</Popover>
		</>
	)
}
