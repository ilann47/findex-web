import { useCallback, useMemo } from 'react'

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import {
	ColumnDef,
	ColumnOrderState,
	OnChangeFn,
	VisibilityState,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { useSearchParams } from './search-params'

const COLUMN_ORDER = 'column-order'
const COLUMN_VISIBILITY = 'column-visibility'

const DEFAULT_VISIBILITY = {}

export const useTable = <T>(data: T[], columns: ColumnDef<T, string>[]) => {
	const { searchParams, setParam, deleteParam } = useSearchParams()

	const defaultColumnOrder: ColumnOrderState = useMemo(() => columns.map((column) => column.id!), [])

	const columnVisibility: VisibilityState = useMemo(() => {
		return JSON.parse(searchParams.get(COLUMN_VISIBILITY) ?? JSON.stringify(DEFAULT_VISIBILITY))
	}, [searchParams.get(COLUMN_VISIBILITY)])

	const setColumnVisibility: OnChangeFn<VisibilityState> = useCallback(
		(updater) => {
			const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater

			if (Object.values(newVisibility).every(Boolean)) {
				deleteParam(COLUMN_VISIBILITY)
			} else {
				setParam(COLUMN_VISIBILITY, JSON.stringify(newVisibility))
			}
		},
		[columnVisibility]
	)

	const columnOrder: ColumnOrderState = useMemo(() => {
		return searchParams.get(COLUMN_ORDER)?.split(' ') ?? defaultColumnOrder
	}, [searchParams.get(COLUMN_ORDER)])

	const setColumnOrder: OnChangeFn<ColumnOrderState> = useCallback(
		(updater) => {
			const newOrder = typeof updater === 'function' ? updater(columnOrder) : updater

			if (defaultColumnOrder.join('') === newOrder.join('')) {
				deleteParam(COLUMN_ORDER)
			} else {
				setParam(COLUMN_ORDER, newOrder.join(' '))
			}
		},
		[columnOrder]
	)

	const table = useReactTable({
		data,
		columns,
		state: {
			columnOrder,
			columnVisibility,
		},
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
	})

	const handleChangeColumnOrder = (event: DragEndEvent) => {
		const { active, over } = event

		if (active && over && active.id !== over.id) {
			const oldIndex = columnOrder!.indexOf(active.id as string)
			const newIndex = columnOrder!.indexOf(over.id as string)
			setColumnOrder(arrayMove(columnOrder!, oldIndex, newIndex))
		}
	}

	return {
		columnOrder,
		columnVisibility,
		...table,
		handleChangeColumnOrder,
	}
}
