import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { DirectPendulumEngineeringData, EngineeringData } from '@/schemas/engineering-data'
import { Instrument } from '@/schemas/instrument'
import { Message } from '@/types/i18n'
import { formatEngineeringValue } from '@/utils/format-engineering-value'

interface Props {
	instrument: Instrument
	getRowLink: (engineeringData: EngineeringData) => string
}

export const DirectPendulumEngineeringDataTable = ({ instrument, getRowLink }: Props) => {
	const formatMessage = useFormatMessage()

	const requestParams = { instrumentId: instrument.id }

	const {
		data: engineeringData,
		totalElements,
		isLoading,
	} = useGetPageable<DirectPendulumEngineeringData>({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.DIRECT_PENDULUM}`,
		requestParams: { ...requestParams, sort: DATE_SORT },
	})

	const columnHelper = createColumnHelper<DirectPendulumEngineeringData>()

	const columns: ColumnDef<DirectPendulumEngineeringData>[] = [
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
		columnHelper.accessor('absoluteDisplacement', {
			id: 'absoluteDisplacement',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.absolute-displacement.name'),
				formatMessage('instrument.engineering-value.absolute-displacement.uom')
			),
		}),
		columnHelper.accessor('relativeDisplacement', {
			id: 'relativeDisplacement',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.relative-displacement.name'),
				formatMessage('instrument.engineering-value.relative-displacement.uom')
			),
		}),
	] as ColumnDef<DirectPendulumEngineeringData>[]

	const title: Message = {
		id: 'instrument.engineering-value.report.title',
		values: {
			instrumentName: instrument.name,
		},
	}
	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.DIRECT_PENDULUM}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.DIRECT_PENDULUM}`,
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
