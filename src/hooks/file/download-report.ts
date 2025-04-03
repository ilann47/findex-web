import { useMemo } from 'react'

import { ColumnDef } from '@tanstack/react-table'

import { useFileParams } from './get-file'
import { useFiltering } from '../filter/filtering'
import { useFormatMessage } from '../i18n/format-message'
import { useLoading } from '../loading'
import { useTable } from '../table'
import { KEYCLOAK_ID_CLIENT, KEYCLOAK_REALM } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { Message } from '@/types/i18n'
import { downloadFile, getFile } from '@/utils/file'

interface Props<T> extends Omit<useFileParams, 'enabled'> {
	title: Message
	tableTitle: Message
	data: T[]
	columns: ColumnDef<T>[]
}

export const useDownloadReport = <T extends object>({
	endpoint,
	filename: filenameId,
	params,
	data,
	columns,
	title,
	tableTitle,
}: Props<T>) => {
	const { filters } = useFiltering()
	const { startLoading, stopLoading } = useLoading()
	const { getVisibleFlatColumns } = useTable(data, columns)
	const formatMessage = useFormatMessage()

	const selectedColumns = useMemo(
		() => getVisibleFlatColumns().map((column) => column.columnDef.meta?.name || column.id),
		[]
	)

	return async () => {
		startLoading()

		const file = await getFile(`${endpoint}/${ENDPOINTS.REPORT}`, formatMessage(filenameId), {
			title: formatMessage(title),
			tableTitle: formatMessage(tableTitle),
			selectedColumns,
			...filters,
			...params,
		})

		stopLoading()
		file && downloadFile(file)
	}
}

export const useDownloadAuthReport = <T extends object>(params: Props<T>) => {
	return useDownloadReport({
		...params,
		params: {
			...params.params,
			realm: KEYCLOAK_REALM,
			idClient: KEYCLOAK_ID_CLIENT,
		},
	})
}
