/* eslint-disable prettier/prettier */
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import AlarmTag from '@/components/ui/tags/alarm-tag'
import EnabledTag from '@/components/ui/tags/enabled-tag'
import { ALARM_TYPES_API } from '@/constants/alarm'
import { DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { ALL_INSTRUMENTS_READING_VARIABLES } from '@/constants/reading-variables'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetAll, useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Alarm } from '@/schemas/alarm'
import { Instrument } from '@/schemas/instrument'
import { Uar } from '@/schemas/uar'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

interface Props {
	uar?: Uar
	instrument?: Instrument
}

export const AlarmsTable = ({ uar, instrument }: Props) => {
	const requestParams = {
		...(uar?.id && { uarIdList: uar.id }),
		...(instrument?.id && { instrumentIdList: instrument.id }),
	}

	const {
		data: alarms,
		totalElements,
		isLoading,
	} = useGetPageable<Alarm>({
		endpoint: ENDPOINTS.ALARM,
		requestParams: {
			sort: DATE_SORT,
			...requestParams,
		},
	})

	const { data: instruments, isLoading: isInstrumentLoading } = useGetAll<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
	})

	const { data: uars, isLoading: isUarLoading } = useGetAll<Uar>({ endpoint: ENDPOINTS.UAR })

	const formatMessage = useFormatMessage()
	const columnHelper = createColumnHelper<Alarm>()

	const columns: ColumnDef<Alarm>[] = [
		...(uar || instrument
			? []
			: [
				columnHelper.accessor('uar.name', {
					id: 'uar.name',
					header: formatMessage('uar.acronym'),
					enableSorting: false,
					meta: {
						filter: {
							type: 'select',
							id: 'uarIdList',
							items: uars.map((uar) => {
								return {
									value: uar.id.toString(),
									label: uar.name,
								}
							}),
							variant: 'multiple',
							isLoading: isUarLoading,
						},
						name: 'uar',
					},
				}),
			]),
		...(instrument
			? []
			: [
				columnHelper.accessor('channel.instrument.name', {
					id: 'channel.instrument.name',
					header: formatMessage('instrument.title.singular'),
					enableSorting: false,
					meta: {
						filter: {
							type: 'select',
							id: 'instrumentIdList',
							items: instruments.map((instrument) => {
								return {
									value: instrument.id.toString(),
									label: instrument.name,
								}
							}),
							variant: 'multiple',
							isLoading: isInstrumentLoading,
						},
						name: 'instrument',
					},
				}),
			]),
		columnHelper.accessor('channel.readingVariable', {
			id: 'channel.readingVariable',
			header: formatMessage('channel.title.singular'),
			enableSorting: false,
			meta: {
				filter: {
					type: 'select',
					id: 'readingVariableList',
					items: ALL_INSTRUMENTS_READING_VARIABLES.map((readingVar) => {
						return {
							value: readingVar,
							label: readingVar,
						}
					}),
					variant: 'multiple',
				},
				name: 'channel',
			},
		}),
		columnHelper.accessor('type', {
			id: 'type',
			header: formatMessage('type'),
			cell: (props) => <AlarmTag alarm={props.getValue()} />,
			enableSorting: false,
			meta: {
				filter: {
					type: 'select',
					id: 'type',
					items: ALARM_TYPES_API.map((alarmType) => {
						return {
							value: alarmType,
							label: formatMessage(`alarm.${snakeToKebabCase(alarmType)}` as Message),
						}
					}),
					variant: 'single',
				},
			},
		}),
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
		columnHelper.accessor('solutionDate', {
			id: 'solutionDate',
			header: formatMessage('solution-date'),
			meta: {
				filter: {
					type: 'range',
					variant: 'date',
					id: 'solutionDate',
				},
			},
		}),
		columnHelper.accessor('active', {
			id: 'active',
			header: formatMessage('active'),
			cell: (props) => <EnabledTag enabled={props.getValue()} />,
			enableSorting: false,
			meta: {
				filter: {
					type: 'select',
					id: 'active',
					items: [
						{ label: formatMessage('no'), value: false },
						{ label: formatMessage('yes'), value: true },
					],
					variant: 'single',
				},
			},
		}),
	] as ColumnDef<Alarm>[]

	const title: Message =
		!uar && !instrument
			? 'alarm.report.title'
			: instrument
				? {
					id: 'instrument.report.alarm.title',
					values: {
						instrumentName: instrument?.name,
					},
				}
				: {
					id: 'uar.report.alarm.title',
					values: {
						uarName: uar?.name,
					},
				}

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: ENDPOINTS.ALARM,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: ENDPOINTS.ALARM,
		filename: title,
		data: alarms,
		columns,
		title,
		tableTitle: 'alarm.title.plural',
		params: requestParams,
	})

	return (
		<Table
			columns={columns}
			data={alarms}
			dataLength={totalElements}
			isLoading={isLoading}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
