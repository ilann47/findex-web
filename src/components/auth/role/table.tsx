import { ReactNode } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadAuthReport } from '@/hooks/file/download-report'
import { useDownloadAuthSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useAuthGetPageable } from '@/hooks/get/get-auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Role } from '@/schemas/auth'
import { Message } from '@/types/i18n'
import { getAuthEqualsFilter } from '@/utils/auth'

interface Props {
	groupName: string
	endTableControls?: ReactNode
	getEndRowNode?: (role: Role) => ReactNode
}

export const RolesTable = ({ groupName, endTableControls, getEndRowNode }: Props) => {
	const {
		data: roles,
		totalElements,
		isLoading,
	} = useAuthGetPageable<Role>({
		endpoint: ENDPOINTS.ROLE,
		requestParams: {
			group: getAuthEqualsFilter(groupName),
		},
	})

	const formatMessage = useFormatMessage()
	const columnHelper = createColumnHelper<Role>()

	const columns: ColumnDef<Role>[] = [
		columnHelper.accessor('name', {
			id: 'name',
			header: formatMessage('name'),
			meta: {
				filter: { type: 'text', id: 'name' },
			},
		}),
		columnHelper.accessor('description', {
			id: 'description',
			header: formatMessage('description'),
			meta: {
				filter: { type: 'text', id: 'description' },
			},
		}),
	] as ColumnDef<Role>[]

	const title: Message = { id: 'auth.group.report.role.title', values: { groupName } }

	const downloadSpreadSheet = useDownloadAuthSpreadsheet({
		endpoint: `${ENDPOINTS.AUTH}/${ENDPOINTS.ROLE}`,
		filename: title,
		params: {
			group: getAuthEqualsFilter(groupName),
		},
	})

	const downloadReport = useDownloadAuthReport({
		endpoint: `${ENDPOINTS.AUTH}/${ENDPOINTS.ROLE}`,
		filename: title,
		data: roles,
		columns,
		title,
		tableTitle: 'auth.role.title.plural',
		params: {
			group: getAuthEqualsFilter(groupName),
		},
	})

	return (
		<Table
			columns={columns}
			data={roles}
			dataLength={totalElements}
			isLoading={isLoading}
			endTableControls={endTableControls}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
			getEndRowNode={getEndRowNode}
		/>
	)
}
