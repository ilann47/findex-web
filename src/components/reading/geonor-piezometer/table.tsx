import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Instrument } from '@/schemas/instrument'
import { GeonorPiezometerReading } from '@/schemas/reading'
import { Message } from '@/types/i18n'
interface Props {
	instrument?: Instrument
}

export const GeonorPiezometerReadingsTable = ({ instrument }: Props) => {
	const formatMessage = useFormatMessage()

	const requestParams = { instrumentId: instrument?.id }

	const {
		data: readings,
		totalElements,
		isLoading,
	} = useGetPageable<GeonorPiezometerReading>({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.GEONOR_PIEZOMETER}`,
		requestParams: { ...requestParams, sort: DATE_SORT },
	})

	const columnHelper = createColumnHelper<GeonorPiezometerReading>()

	const columns: ColumnDef<GeonorPiezometerReading>[] = [
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
		columnHelper.accessor('r1', {
			id: 'r1',
			header: formatMessage('instrument.readings.r1'),
		}),
	] as ColumnDef<GeonorPiezometerReading>[]

	const title: Message = {
		id: 'instrument.readings.report.title',
		values: {
			instrumentName: instrument?.name,
		},
	}

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.GEONOR_PIEZOMETER}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.GEONOR_PIEZOMETER}`,
		filename: title,
		data: readings,
		columns,
		title,
		tableTitle: 'instrument.readings.title.plural',
		params: requestParams,
	})

	return (
		<Table
			columns={columns}
			data={readings}
			dataLength={totalElements}
			isLoading={isLoading}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
