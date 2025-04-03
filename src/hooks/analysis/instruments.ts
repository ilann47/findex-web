/* eslint-disable unicorn/no-array-reduce */
import { useCallback, useMemo } from 'react'

import { useSearchParams } from '../search-params'
import { INSTRUMENT_DEFAULT_ENGINEERING_DATA } from '@/constants/engineering-data'
import { InstrumentType } from '@/schemas/instrument'

/**
 * Hook that manages instruments and engineering values in the URL search parameters.
 *
 * - Instrument IDs are stored in the URL along an list of engineering values.
 * - The URL format is: `?instruments=instrumentId1:engineeringValue1,engineeringValue2;instrumentId2:engineeringValue3,engineeringValue4`.
 *
 * @returns {Object}
 *
 * @property {Function} addInstruments - Adds one or more instrument IDs to the URL while preserving existing ones.
 * @property {Function} removeInstrument - Removes an instrument and its associated engineering values from the URL.
 * @property {Function} handleEngineeringValueClick - Adds or removes an engineering value for a specific instrument in the URL.
 * @property {Object} instrumentsMetaData - The current instruments and their associated engineering values from the URL.
 */

const INSTRUMENTS = 'instruments'

export interface InstrumentMetaData {
	instrumentId: number
	selectedEngineeringData: string[]
}

export const useAnalysisInstruments = () => {
	const { setParam, searchParams, deleteParam } = useSearchParams()

	const instrumentsMap = useMemo(() => {
		const instrumentsParam = searchParams.get(INSTRUMENTS)
		if (!instrumentsParam) return {}

		return instrumentsParam.split(';').reduce(
			(acc, entry) => {
				const [instrumentId, values] = entry.split(':')
				acc[Number(instrumentId)] = values ? values.split(',') : []
				return acc
			},
			{} as Record<number, string[]>
		)
	}, [searchParams])

	const instrumentsMetaData: InstrumentMetaData[] = useMemo(
		() =>
			Object.entries(instrumentsMap).map(([id, selectedEngineeringData]) => ({
				instrumentId: Number(id),
				selectedEngineeringData,
			})),
		[instrumentsMap]
	)

	const updateInstrumentsParam = useCallback(
		(instrumentsMap: Record<number, string[]>) => {
			const newParamValue = Object.entries(instrumentsMap)
				.map(([id, values]) => `${id}:${values.join(',')}`)
				.join(';')

			setParam(INSTRUMENTS, newParamValue)
		},
		[setParam]
	)

	const addInstruments = useCallback(
		(instruments: { id: number; type: InstrumentType }[]) => {
			for (const inst of instruments) {
				if (!instrumentsMap[inst.id]) {
					instrumentsMap[inst.id] = INSTRUMENT_DEFAULT_ENGINEERING_DATA[inst.type]
				}
			}

			updateInstrumentsParam(instrumentsMap)
		},
		[instrumentsMap, updateInstrumentsParam]
	)

	const removeInstrument = useCallback(
		(instrumentId: number) => {
			delete instrumentsMap[instrumentId]

			if (Object.keys(instrumentsMap).length === 0) {
				deleteParam(INSTRUMENTS)
			} else {
				updateInstrumentsParam(instrumentsMap)
			}
		},
		[instrumentsMap, setParam, deleteParam]
	)

	const handleEngineeringValueClick = useCallback(
		(instrumentId: number, engineeringValue: string) => {
			if (instrumentsMap[instrumentId]) {
				const values = new Set(instrumentsMap[instrumentId])

				if (values.has(engineeringValue)) {
					values.delete(engineeringValue)
				} else {
					values.add(engineeringValue)
				}

				instrumentsMap[instrumentId] = [...values]
			}

			updateInstrumentsParam(instrumentsMap)
		},
		[instrumentsMap, setParam]
	)

	return {
		addInstruments,
		removeInstrument,
		handleEngineeringValueClick,
		instrumentsMetaData,
	}
}
