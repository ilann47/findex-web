import { useCallback, useMemo } from 'react'

import { useSearchParams } from './search-params'

const ROWS_PER_PAGE = 'rows-per-page'
const PAGE = 'page'

const DEFAULT_PAGE = 0
const DEFAULT_ROWS_PER_PAGE = 5

export const usePagination = () => {
	const { searchParams, deleteParam, setParam } = useSearchParams()

	const page = useMemo(() => Number(searchParams.get(PAGE) ?? DEFAULT_PAGE), [searchParams])
	const rowsPerPage = useMemo(() => Number(searchParams.get(ROWS_PER_PAGE) ?? DEFAULT_ROWS_PER_PAGE), [searchParams])

	const changePage = useCallback((page: number) => {
		if (page) {
			setParam(PAGE, page)
		} else {
			deleteParam(PAGE)
		}
	}, [])

	const changeRowsPerPage = useCallback((rowsPerPage: number) => {
		changePage(0)

		if (rowsPerPage == DEFAULT_ROWS_PER_PAGE) {
			deleteParam(ROWS_PER_PAGE)
		} else {
			setParam(ROWS_PER_PAGE, String(rowsPerPage))
		}
	}, [])

	return {
		page,
		rowsPerPage,
		changePage,
		changeRowsPerPage,
	}
}
