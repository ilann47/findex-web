import { useCallback, useMemo } from 'react'

import { usePagination } from './pagination'
import { useSearchParams } from './search-params'
import { SortingType } from '@/types/sorting-type'

const SORT = 'sort'
export const ASC: SortingType = 'ASC'
export const DESC: SortingType = 'DESC'

export const useSorting = () => {
	const { searchParams, setParam, deleteParam } = useSearchParams()
	const { changePage } = usePagination()

	const sort = useMemo(() => searchParams.get(SORT), [searchParams])
	const sortingColumn = useMemo(() => sort?.split(',')[0], [sort])
	const sortingType: SortingType | undefined = useMemo(() => sort?.split(',')[1] as SortingType, [sort])

	const changeSorting = (column: string, type: SortingType | null) => {
		changePage(0)
		if (type) setParam(SORT, `${column},${type}`)
		else deleteParam(SORT)
	}

	const getIsSortedBy = useCallback((columnKey: string) => sortingColumn == columnKey, [sortingColumn])

	return {
		sortingColumn,
		sortingType,
		changeSorting,
		getIsSortedBy,
		sort,
	}
}
