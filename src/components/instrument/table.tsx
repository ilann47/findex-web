/* eslint-disable indent */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import AlarmTag from '@/components/ui/tags/alarm-tag'
import EnabledTag from '@/components/ui/tags/enabled-tag'
import { ENDPOINTS } from '@/constants/endpoints'
import { INSTRUMENT_TYPES } from '@/constants/instrument'
import { useDownloadReport } from '@/hooks/file/download-report'
import { useDownloadSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useGetAll, useGetPageable } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Instrument } from '@/schemas/instrument'
import { Uar } from '@/schemas/uar'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

interface Props {
	uar?: Uar
}

export const InstrumentsTable = ({ uar }: Props) => {
	const requestParams = {
		uarIdList: uar?.id,
	}

	const {
		data: instruments,
		totalElements,
		isLoading,
	} = useGetPageable<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
		requestParams,
	})

	const { data: uars, isLoading: isUarLoading } = useGetAll<Uar>({ endpoint: ENDPOINTS.UAR })

	const formatMessage = useFormatMessage()
	const columnHelper = createColumnHelper<Instrument>()

	const columns: ColumnDef<Instrument>[] = [
		columnHelper.accessor('name', {
			id: 'name',
			header: formatMessage('name'),
			meta: {
				filter: {
					type: 'text',
					id: 'name',
				},
			},
		}),
		columnHelper.accessor('type', {
			id: 'type',
			header: formatMessage('type'),
			cell: (props) => formatMessage(`instrument.type.${snakeToKebabCase(props.getValue())}` as Message),
			enableSorting: false,
			meta: {
				filter: {
					id: 'typeList',
					type: 'select',
					items: INSTRUMENT_TYPES.map((instrumentType) => {
						return {
							value: instrumentType,
							label: formatMessage(`instrument.type.${snakeToKebabCase(instrumentType)}` as Message),
						}
					}),
					variant: 'multiple',
				},
			},
		}),
		columnHelper.accessor('location.description', {
			id: 'location.description',
			header: formatMessage('location.title'),
			meta: {
				filter: {
					type: 'text',
					id: 'locationDescription',
				},
				name: 'locationDescription',
			},
		}),
		...(uar
			? []
			: [
					columnHelper.accessor('uar.name', {
						id: 'uar.name',
						header: formatMessage('uar.acronym'),
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
						},
					}),
				]),
		columnHelper.accessor('enabled', {
			id: 'enabled',
			header: formatMessage('enabled'),
			cell: (props) => <EnabledTag enabled={props.getValue()} />,
			enableSorting: false,
			meta: {
				filter: {
					type: 'select',
					id: 'enabled',
					items: [
						{ label: 'Nao', value: false },
						{ label: 'Sim', value: true },
					],
					variant: 'single',
				},
			},
		}),
		columnHelper.accessor('hasAlarm', {
			id: 'hasAlarm',
			header: formatMessage('alarm.title.singular'),
			cell: (props) => (props.getValue() ? <AlarmTag alarm='SENSOR_FAILURE' /> : <AlarmTag alarm='NORMAL' />),
			enableSorting: false,
			meta: {
				filter: {
					id: 'activeAlarm',
					type: 'select',
					items: [
						{ label: 'Resolvido', value: false },
						{ label: 'Ativo', value: true },
					],
					variant: 'single',
				},
				name: 'alarm',
			},
		}),
	] as ColumnDef<Instrument>[]

	const getRowLink = useCallback(
		(instrument: Instrument) =>
			uar ? `instruments/${instrument.type}/${instrument.id}` : `${instrument.type}/${instrument.id}`,
		[uar]
	)

	const title: Message = uar
		? { id: 'uar.report.instrument.title', values: { uarName: uar.name } }
		: 'instrument.report.title'

	const downloadSpreadSheet = useDownloadSpreadsheet({
		endpoint: ENDPOINTS.INSTRUMENT,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadReport({
		endpoint: ENDPOINTS.INSTRUMENT,
		filename: title,
		data: instruments,
		columns,
		title,
		tableTitle: 'instrument.title.plural',
		params: requestParams,
	})

	return (
		<Table
			columns={columns}
			data={instruments}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
