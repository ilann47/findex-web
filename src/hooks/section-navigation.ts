import { useCallback } from 'react'

import { useSearchParams } from './search-params'

const SECTION = 'section'

export const useSectionNavigation = <S extends string>(initial: S) => {
	const { searchParams, setParam, clearParams } = useSearchParams()

	const section = (searchParams.get(SECTION) ?? initial) as S

	const changeSection = useCallback((newSection: S) => {
		clearParams()

		setParam(SECTION, newSection)
	}, [])

	return {
		section: section,
		changeSection,
	}
}
