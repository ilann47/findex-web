import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { AlarmTags } from '@/components/ui/tags/alarm-tag'
import EnabledTag from '@/components/ui/tags/enabled-tag'
import { ALARM_TYPES } from '@/constants/alarm'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Uar } from '@/schemas/uar'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

export const UarsTable = () => {
	const { data: uars, totalElements, isLoading } = useGetPageable<Uar>({ endpoint: ENDPOINTS.UAR })

	const formatMessage = useFormatMessage()
	const columnHelper = createColumnHelper<Uar>()

	const columns: ColumnDef<Uar>[] = [
		columnHelper.accessor('name', {
			id: 'name',
			header: formatMessage('name'),
			meta: {
				filter: { type: 'text', id: 'name' },
			},
		}),
		columnHelper.accessor('location.description', {
			id: 'locationDescription',
			header: formatMessage('location.title'),
			meta: {
				filter: { type: 'text', id: 'locationDescription' },
				name: 'location',
			},
		}),
		columnHelper.accessor('lndbRef', {
			id: 'lndbRef',
			header: formatMessage('uar.lndb-reference'),
			meta: {
				filter: { type: 'text', id: 'lndbRef' },
			},
		}),
		columnHelper.accessor('alarms', {
			id: 'alarms',
			header: formatMessage('alarm.title.singular'),
			cell: (props) => <AlarmTags alarms={props.getValue() ?? []} />,
			enableSorting: false,
			meta: {
				filter: {
					id: 'alarmTypeList',
					type: 'select',
					items: ALARM_TYPES.map((alarmType) => {
						return {
							value: alarmType === 'NORMAL' ? ',' : alarmType,
							label: formatMessage(`alarm.${snakeToKebabCase(alarmType)}` as Message),
						}
					}),
					variant: 'multiple',
				},
			},
		}),
		columnHelper.accessor('enabled', {
			id: 'enabled',
			header: formatMessage('enabled'),
			cell: (props) => <EnabledTag enabled={props.getValue()} />,
			enableSorting: false,
			meta: {
				filter: {
					id: 'enabled',
					type: 'select',
					items: [
						{ label: 'Nao', value: false },
						{ label: 'Sim', value: true },
					],
					variant: 'single',
				},
			},
		}),
	] as ColumnDef<Uar>[]

	const getRowLink = useCallback((uar: Uar) => `${uar.id}`, [])

	const title = 'uar.report.title'

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: ENDPOINTS.UAR,
		filename: title,
	})

	const downloadReport = useDownloadReport({
		endpoint: ENDPOINTS.UAR,
		filename: title,
		data: uars,
		columns,
		title,
		tableTitle: 'uar.title.plural',
	})

	return (
		<Table
			columns={columns}
			data={uars}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
