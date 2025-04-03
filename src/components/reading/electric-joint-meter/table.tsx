import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Instrument } from '@/schemas/instrument'
import { ElectricJointMeterReading } from '@/schemas/reading'
import { Message } from '@/types/i18n'

interface Props {
	instrument?: Instrument
}

export const ElectricJointMeterReadingsTable = ({ instrument }: Props) => {
	const formatMessage = useFormatMessage()

	const requestParams = { instrumentId: instrument?.id }

	const {
		data: readings,
		totalElements,
		isLoading,
	} = useGetPageable<ElectricJointMeterReading>({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
		requestParams: { ...requestParams, sort: DATE_SORT },
	})

	const columnHelper = createColumnHelper<ElectricJointMeterReading>()

	const columns: ColumnDef<ElectricJointMeterReading>[] = [
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
		columnHelper.accessor('vr', {
			id: 'vr',
			header: formatMessage('instrument.readings.vr'),
		}),
		columnHelper.accessor('vrl1', {
			id: 'vrl1',
			header: formatMessage('instrument.readings.vrl1'),
		}),
		columnHelper.accessor('vp', {
			id: 'vp',
			header: formatMessage('instrument.readings.vp'),
		}),
		columnHelper.accessor('vr5', {
			id: 'vr5',
			header: formatMessage('instrument.readings.vr5'),
		}),
	] as ColumnDef<ElectricJointMeterReading>[]

	const title: Message = {
		id: 'instrument.readings.report.title',
		values: {
			instrumentName: instrument?.name,
		},
	}

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: `${ENDPOINTS.READING}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
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
