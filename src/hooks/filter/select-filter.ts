import { useCallback, useEffect, useMemo, useState } from 'react'

import { useFiltering } from './filtering'
import { SelectFilter } from '@/types/filter-type'

export const useSelectFiltering = (filter: SelectFilter) => {
	const { filters, applyFilter, cleanFilter } = useFiltering()
	const { id, variant, items } = filter
	const itemsValue = items.map((item) => item.value.toString())
	const [selectedItems, setSelectedItems] = useState(variant === 'multiple' ? itemsValue : [])

	useEffect(() => {
		if (filters[id]) {
			setSelectedItems(filters[id].split(','))
		} else {
			const selected = variant === 'multiple' ? itemsValue : []
			setSelectedItems(selected)
		}
	}, [filters])

	const isAllChecked = useMemo(() => {
		return items.length === selectedItems.length
	}, [selectedItems])

	const isIndeterminate = useMemo(
		() => selectedItems.length > 0 && selectedItems.length < items.length,
		[selectedItems]
	)

	const isItemChecked = useCallback((item: string) => selectedItems.includes(item), [selectedItems])

	const handleSelectAll = useCallback(() => {
		const newFilter = isAllChecked ? [] : itemsValue

		cleanFilter(id)
		setSelectedItems(newFilter)
	}, [isAllChecked, id])

	const handleChangeSelect = useCallback(
		(value: string) => {
			const newValue = isItemChecked(value)
				? selectedItems.filter((item) => item !== value)
				: variant === 'multiple' && value
					? [...selectedItems, value]
					: [value]

			cleanFilter(id)

			if (newValue.length !== items.length) {
				applyFilter({
					id: id,
					value: newValue,
					type: 'select',
				})
			}
		},
		[selectedItems, variant, items.length, id, filter, applyFilter, cleanFilter]
	)

	return {
		isAllChecked,
		isIndeterminate,
		isItemChecked,
		handleChangeSelect,
		handleSelectAll,
		selectedItems,
	}
}
