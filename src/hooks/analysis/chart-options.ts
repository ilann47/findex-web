import { useCallback, useEffect, useMemo } from 'react'

import { useSearchParams } from '../search-params'

const RENDERING_TYPE = 'rendering-type'

export type ChartRenderingType = 'multiple' | 'single-multiple-y' | 'single-single-y'

export const useChartOptions = () => {
	const { searchParams, setParam } = useSearchParams()

	const renderingType = useMemo(() => searchParams.get(RENDERING_TYPE) as ChartRenderingType | null, [searchParams])

	const changeRenderingType = useCallback(
		(renderingType: ChartRenderingType) => setParam(RENDERING_TYPE, renderingType),
		[]
	)

	useEffect(() => {
		if (!renderingType) {
			changeRenderingType('multiple')
		}
	}, [])

	return {
		renderingType,
		changeRenderingType,
	}
}
