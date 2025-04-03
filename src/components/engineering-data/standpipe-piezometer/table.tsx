import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { EngineeringData, StandpipePiezometerEngineeringData } from '@/schemas/engineering-data'
import { Instrument } from '@/schemas/instrument'
import { Message } from '@/types/i18n'
import { formatEngineeringValue } from '@/utils/format-engineering-value'

interface Props {
	instrument: Instrument
	getRowLink: (engineeringData: EngineeringData) => string
}

export const StandpipePiezometerEngineeringDataTable = ({ instrument, getRowLink }: Props) => {
	const formatMessage = useFormatMessage()

	const requestParams = { instrumentId: instrument.id }

	const {
		data: engineeringData,
		totalElements,
		isLoading,
	} = useGetPageable<StandpipePiezometerEngineeringData>({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.STANDPIPE_PIEZOMETER}`,
		requestParams: { ...requestParams, sort: DATE_SORT },
	})

	const columnHelper = createColumnHelper<StandpipePiezometerEngineeringData>()

	const columns: ColumnDef<StandpipePiezometerEngineeringData>[] = [
		columnHelper.accessor('date', {
			id: 'date',
			header: formatMessage('date'),
			meta: {
				filter: {
					type: 'range',
					id: 'date',
					variant: 'date',
				},
			},
		}),
		columnHelper.accessor('absolutePressure', {
			id: 'absolutePressure',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.absolute-pressure.name'),
				formatMessage('instrument.engineering-value.absolute-pressure.uom')
			),
		}),
		columnHelper.accessor('relativePressure', {
			id: 'relativePressure',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.relative-pressure.name'),
				formatMessage('instrument.engineering-value.relative-pressure.uom')
			),
		}),
		columnHelper.accessor('seaLevelElevation', {
			id: 'seaLevelElevation',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.sea-level-elevation.name'),
				formatMessage('instrument.engineering-value.sea-level-elevation.uom')
			),
		}),
		columnHelper.accessor('tubeWaterLevelDistance', {
			id: 'tubeWaterLevelDistance',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.tube-water-level-distance.name'),
				formatMessage('instrument.engineering-value.tube-water-level-distance.uom')
			),
		}),
	] as ColumnDef<StandpipePiezometerEngineeringData>[]

	const title: Message = {
		id: 'instrument.engineering-value.report.title',
		values: {
			instrumentName: instrument.name,
		},
	}

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.STANDPIPE_PIEZOMETER}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.STANDPIPE_PIEZOMETER}`,
		filename: title,
		data: engineeringData,
		columns,
		title,
		tableTitle: 'instrument.engineering-value.title.plural',
		params: requestParams,
	})
	return (
		<Table
			columns={columns}
			data={engineeringData}
			dataLength={totalElements}
			isLoading={isLoading}
			getRowLink={getRowLink}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
