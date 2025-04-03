import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ElectricJointMeterEngineeringData, EngineeringData } from '@/schemas/engineering-data'
import { Instrument } from '@/schemas/instrument'
import { Message } from '@/types/i18n'
import { formatEngineeringValue } from '@/utils/format-engineering-value'

interface Props {
	instrument: Instrument
	getRowLink: (engineeringData: EngineeringData) => string
}

export const ElectricJointMeterEngineeringDataTable = ({ instrument, getRowLink }: Props) => {
	const formatMessage = useFormatMessage()

	const requestParams = { instrumentId: instrument.id }

	const {
		data: engineeringData,
		totalElements,
		isLoading,
	} = useGetPageable<ElectricJointMeterEngineeringData>({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
		requestParams: { ...requestParams, sort: DATE_SORT },
	})

	const columnHelper = createColumnHelper<ElectricJointMeterEngineeringData>()

	const columns: ColumnDef<ElectricJointMeterEngineeringData>[] = [
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
		columnHelper.accessor('metersSum', {
			id: 'metersSum',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.meters-sum.name'),
				formatMessage('instrument.engineering-value.meters-sum.uom')
			),
		}),
		columnHelper.accessor('metersRatio', {
			id: 'metersRatio',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.meters-ratio.name'),
				formatMessage('instrument.engineering-value.meters-ratio.uom')
			),
		}),
		columnHelper.accessor('temperature', {
			id: 'temperature',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.temperature.name'),
				formatMessage('instrument.engineering-value.temperature.uom')
			),
		}),
		columnHelper.accessor('displacement', {
			id: 'displacement',
			header: formatEngineeringValue(
				formatMessage('instrument.engineering-value.displacement.name'),
				formatMessage('instrument.engineering-value.displacement.uom')
			),
		}),
	] as ColumnDef<ElectricJointMeterEngineeringData>[]

	const title: Message = {
		id: 'instrument.engineering-value.report.title',
		values: {
			instrumentName: instrument.name,
		},
	}

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
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
