import { useMemo } from 'react'

import { EngineeringValueChart } from '../../../../components/engineering-data/chart/engineering-value'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAnalysisPeriodicity } from '@/hooks/analysis/periodicity'
import { useGetAll } from '@/hooks/get'
import { useGetBy } from '@/hooks/get/get-by'
import { Instrument } from '@/schemas/instrument'
import { GenericEngineeringData } from '@/types/generic-engineering-data'
import { DateObjectToDateString } from '@/utils/date'

interface Props {
	instrumentId: number
	selectedEngineeringData: string[]
}

export const InstrumentCharts = ({ instrumentId, selectedEngineeringData }: Props) => {
	const { data: instrument, isLoading: isLoadingInstrument } = useGetBy<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
		id: instrumentId,
	})

	const { startDate, endDate, aggregateType, aggregatePeriod, reference } = useAnalysisPeriodicity()

	const { data: engineeringData, isLoading: isLoadingEngineeringData } = useGetAll<GenericEngineeringData>({
		endpoint: instrument ? `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS[instrument.type]}` : '',
		requestParams: {
			instrumentId: instrument?.id,
			date: {
				start: DateObjectToDateString(startDate),
				end: DateObjectToDateString(endDate),
			},
			aggregateType,
			aggregatePeriod,
			reference,
			sort: 'date,ASC',
		},
		enabled: !!instrument,
	})

	const isLoading = useMemo(
		() => isLoadingEngineeringData || isLoadingInstrument,
		[isLoadingEngineeringData, isLoadingInstrument]
	)

	if (!instrument && !isLoading) return null

	return selectedEngineeringData.map((engineeringValueName) => (
		<EngineeringValueChart
			key={engineeringValueName}
			engineeringValueName={engineeringValueName}
			instrumentName={instrument?.name ?? ''}
			engineeringValues={engineeringData.map((datum) => ({
				date: datum.date,
				value: datum[engineeringValueName],
			}))}
			isLoading={isLoading}
		/>
	))
}
