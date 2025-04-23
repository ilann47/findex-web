import { useMemo } from 'react'

import { useQueries } from '@tanstack/react-query'

import { useAnalysisInstruments } from './instruments'
import { useAnalysisPeriodicity } from './periodicity'
import { ENDPOINTS } from '@/constants/endpoints'
import { Instrument } from '@/schemas/instrument'
import { pageableSchema } from '@/schemas/pageable'
import { Service } from '@/service'
import { saadAPI } from '@/shared/sarf'
import { GenericEngineeringData } from '@/types/generic-engineering-data'
import { DateObjectToDateString } from '@/utils/date'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

export interface MappedEngineeringData {
	instrument: Instrument
	engineeringValueName: string
	engineeringData: GenericEngineeringData[]
}

export const useEngineeringDataChart = () => {
	const { instrumentsMetaData } = useAnalysisInstruments()

	const service = new Service(saadAPI, '')

	const { startDate, endDate, aggregateType, aggregatePeriod, reference } = useAnalysisPeriodicity()

	const { data: instruments, isLoading: isLoadingInstruments } = useQueries({
		queries: instrumentsMetaData.map((datum) => ({
			queryKey: [ENDPOINTS.INSTRUMENT, Number(datum.instrumentId)],
			queryFn: async () => await service.getBy<Instrument>(datum.instrumentId, ENDPOINTS.INSTRUMENT),
		})),
		combine: (results) => ({
			data: results.map((result) => result.data) as Instrument[],
			isLoading: results.some((result) => result.isLoading),
		}),
	})

	const { data, isLoading: isLoadingEngineeringData } = useQueries({
		queries: instrumentsMetaData.map((datum) => {
			const instrument = instruments.find((instrument) => instrument?.id == datum.instrumentId)

			if (!instrument)
				return {
					queryKey: [],
					queryFn: async () => getSchemaDefaults(pageableSchema),
				}

			const endpoint = `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS[instrument.type]}`

			const params = {
				instrumentId: instrument.id,
				date: {
					start: DateObjectToDateString(startDate),
					end: DateObjectToDateString(endDate),
				},
				aggregateType,
				aggregatePeriod,
				reference,
				sort: 'date,ASC',
			}

			return {
				queryKey: [endpoint, params],
				queryFn: async () => await service.get<GenericEngineeringData>({ ...params, paged: false }, endpoint),
			}
		}),
		combine: (results) => ({
			data: results.flatMap((result, index) =>
				instrumentsMetaData[index].selectedEngineeringData.flatMap(
					(engineeringValueName) =>
						({
							instrument: instruments[index],
							engineeringValueName,
							engineeringData: (result.data?.content ?? []) as GenericEngineeringData[],
						}) as MappedEngineeringData
				)
			),
			isLoading: results.some((result) => result.isLoading),
		}),
	})

	const isLoading = useMemo(
		() => isLoadingEngineeringData || isLoadingInstruments,
		[isLoadingEngineeringData, isLoadingInstruments]
	)

	return { isLoading, data }
}
