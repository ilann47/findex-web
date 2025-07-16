import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext } from '@dnd-kit/sortable'
import { List } from '@mui/material'
import { Column } from '@tanstack/react-table'

import SortableListItem from './sortable-list-item'

interface SortableListProps<T> {
	items: Column<T, unknown>[]
	changeOrder: (e: DragEndEvent) => void
}

const SortableList = <T extends object>({ items, changeOrder }: SortableListProps<T>) => {
	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

	return (
		<List sx={{ p: 1 }}>
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToVerticalAxis, restrictToParentElement]}
				onDragEnd={changeOrder}
				sensors={sensors}
			>
				<SortableContext items={items}>
					{items.map((item) => (
						<SortableListItem key={item.id} item={item} />
					))}
				</SortableContext>
			</DndContext>
		</List>
	)
}

export default SortableList
