import { Draggable } from '@carbon/icons-react'
import { useSortable } from '@dnd-kit/sortable'
import { Checkbox, ListItemText } from '@mui/material'
import { Column } from '@tanstack/react-table'

import { StyledSortableListItem } from './style'
import { IconButton } from '@/components/ui/inputs/icon-button'

interface SortableListItemProps<T> {
	item: Column<T, unknown>
}

const SortableListItem = <T extends object>({ item }: SortableListItemProps<T>) => {
	const { attributes, listeners, transform, transition, setNodeRef, setActivatorNodeRef } = useSortable({
		id: item.id,
		disabled: !item.getIsVisible(),
	})

	return (
		<StyledSortableListItem
			ref={setNodeRef}
			$isColumnVisible={item.getIsVisible()}
			transform={transform}
			transition={transition}
			disablePadding
		>
			<Checkbox
				edge='start'
				onChange={item.getToggleVisibilityHandler()}
				checked={item.getIsVisible()}
				disabled={!item.getCanHide()}
			/>
			<ListItemText>{item.columnDef.header?.toString()}</ListItemText>
			<IconButton ref={setActivatorNodeRef} tooltip='actions.drag' {...attributes} {...listeners}>
				<Draggable />
			</IconButton>
		</StyledSortableListItem>
	)
}

export default SortableListItem
