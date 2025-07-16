import { Draggable } from '@carbon/icons-react'
import { useSortable } from '@dnd-kit/sortable'
import { Stack } from '@mui/material'
import { Header, flexRender } from '@tanstack/react-table'

import FilteringButton from './filtering-button'
import SortingButton from './sorting-button'
import { DraggableTableCell } from './style'
import { IconButton } from '../../inputs/icon-button'

interface TableHeaderProps<T> {
	header: Header<T, unknown>
}

const TableHeader = <T extends object>({ header }: TableHeaderProps<T>) => {
	const column = header.column
	const filter = column.columnDef.meta?.filter
	const { setNodeRef, setActivatorNodeRef, listeners, attributes, transform, transition, isDragging } = useSortable({
		id: column.id,
	})

	return (
		<>
			<DraggableTableCell transform={transform} transition={transition} $isDragging={isDragging} ref={setNodeRef}>
				<Stack direction='row' alignItems='center'>
					{flexRender(column.columnDef.header, header.getContext())}
					{column.getCanSort() && <SortingButton column={column} />}
					{column.getCanFilter() && filter && <FilteringButton filter={filter} />}
					<IconButton
						ref={setActivatorNodeRef}
						{...listeners}
						{...attributes}
						sx={{ marginLeft: 'auto' }}
						tooltip='actions.drag'
					>
						<Draggable />
					</IconButton>
				</Stack>
			</DraggableTableCell>
		</>
	)
}

export default TableHeader
