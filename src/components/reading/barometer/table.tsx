import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Instrument } from '@/schemas/instrument'
import { BarometerReading } from '@/schemas/reading'
import { Message } from '@/types/i18n'

interface Props {
	instrument?: Instrument
}

export const BarometerReadingsTable = ({ instrument }: Props) => {
	const formatMessage = useFormatMessage()

	const requestParams = { instrumentId: instrument?.id }

	const {
		data: readings,
		totalElements,
		isLoading,
	} = useGetPageable<BarometerReading>({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.BAROMETER}`,
		requestParams: { ...requestParams, sort: DATE_SORT },
	})

	const columnHelper = createColumnHelper<BarometerReading>()

	const columns: ColumnDef<BarometerReading>[] = [
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
		columnHelper.accessor('r', {
			id: 'r',
			header: formatMessage('instrument.readings.r'),
		}),
	] as ColumnDef<BarometerReading>[]

	const title: Message = {
		id: 'instrument.readings.report.title',
		values: {
			instrumentName: instrument?.name,
		},
	}

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.BAROMETER}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.BAROMETER}`,
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
