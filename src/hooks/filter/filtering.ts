/* eslint-disable indent */
import { useMemo } from 'react'

import { usePagination } from '../pagination'
import { useSearchParams } from '../search-params'
import { getAuthLikeFilter } from '@/utils/auth'

export const FILTERS = 'filters'
const SINGLE_VALUES = 'single-values'
export interface FiltersParams {
	[filterId: string]: string
}
export interface RangeValue {
	start?: string
	end?: string
}

interface ChangeSelectFilter {
	id: string
	value: string[]
	type: 'select'
}

interface ChangeTextFilter {
	id: string
	value: string
	type: 'text' | 'like'
}

interface ChangeRangeFilter {
	id: string
	value: RangeValue
	type: 'range'
}

type ChangeFilterProps = ChangeSelectFilter | ChangeTextFilter | ChangeRangeFilter

const getRangeId = (id: string) => {
	return { start: `${id}.start`, end: `${id}.end` }
}

export const useFiltering = () => {
	const { searchParams, setParam, deleteParam } = useSearchParams()
	const { changePage } = usePagination()

	const singleRangeValues = useMemo<string[]>(() => {
		const params = searchParams.get(SINGLE_VALUES)
		return params ? params.split(' ') : []
	}, [searchParams])

	const filters = useMemo<FiltersParams>(() => {
		const params = searchParams.get(FILTERS)
		return params ? JSON.parse(params) : {}
	}, [searchParams])

	const applyFilter = ({ id, type, value }: ChangeFilterProps) => {
		const newFilter = { ...filters }

		switch (type) {
			case 'select': {
				if (value.length <= 0) return
				newFilter[id] = value.join(',')
				break
			}
			case 'text': {
				if (value.length <= 0) return
				newFilter[id] = value
				break
			}
			case 'like': {
				if (value.length <= 0) return
				newFilter[id] = getAuthLikeFilter(value)
				break
			}
			case 'range': {
				const { start, end } = getRangeId(id)
				if (value.start) newFilter[start] = value.start
				if (value.end) newFilter[end] = value.end
				break
			}
		}

		changePage(0)
		updateFilterParams(newFilter)
	}

	const cleanFilter = (id: string, range?: boolean) => {
		const newFilters = { ...filters }

		if (range) {
			const { start, end } = getRangeId(id)
			newFilters[start] && delete newFilters[start]
			newFilters[end] && delete newFilters[end]
			deleteParam(SINGLE_VALUES)
		} else {
			newFilters[id] && delete newFilters[id]
		}

		changePage(0)
		updateFilterParams(newFilters)
	}

	const clearAll = () => {
		changePage(0)
		deleteParam(FILTERS)
		deleteParam(SINGLE_VALUES)
	}

	const getIsFilteredBy = (id: string) => {
		const { start, end } = getRangeId(id)
		return filters[id] || filters[start] || filters[end] || getIsSingleValue(id)
	}

	const hasFilters = useMemo(
		() => Object.keys(filters).length > 0 || singleRangeValues.length > 0,
		[filters, singleRangeValues]
	)

	const getIsSingleValue = (id: string) => {
		return singleRangeValues.includes(id)
	}

	const setSingleValue = (id: string) => {
		const newSingleValue = getIsSingleValue(id)
			? singleRangeValues.filter((filterId) => filterId !== id)
			: [...singleRangeValues, id]

		cleanFilter(id, true)

		if (newSingleValue.length === 0) {
			deleteParam(SINGLE_VALUES)
		} else {
			setParam(SINGLE_VALUES, newSingleValue.join(' '))
		}
	}

	const updateFilterParams = (newValue: FiltersParams) => {
		if (newValue !== filters) {
			if (Object.keys(newValue).length === 0) {
				deleteParam(FILTERS)
			} else {
				setParam(FILTERS, JSON.stringify(newValue))
			}
		}
	}

	return {
		filters,
		applyFilter,
		setSingleValue,
		getIsSingleValue,
		getRangeId,
		cleanFilter,
		clearAll,
		getIsFilteredBy,
		hasFilters,
	}
}
