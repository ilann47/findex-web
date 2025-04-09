/* eslint-disable indent */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import EnabledTag from '@/components/ui/tags/enabled-tag'
import { KEYCLOAK_ACCESS_GROUP } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadAuthReport } from '@/hooks/file/download-report'
import { useDownloadAuthSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useAuthGetPageable } from '@/hooks/get/get-auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { User } from '@/schemas/auth'
import { Message } from '@/types/i18n'
import { getAuthEqualsFilter } from '@/utils/auth'

interface Props {
	groupName?: string
}

export const UsersTable = ({ groupName }: Props) => {
	const {
		data: users,
		totalElements,
		isLoading,
	} = useAuthGetPageable<User>({
		endpoint: ENDPOINTS.USER,
		requestParams: {
			group: getAuthEqualsFilter(groupName ?? KEYCLOAK_ACCESS_GROUP),
		},
	})

	const formatMessage = useFormatMessage()
	const columnHelper = createColumnHelper<User>()

	const columns: ColumnDef<User>[] = [


		columnHelper.accessor('email', {
			id: 'email',
			header: formatMessage('auth.user.email'),
			meta: {
				filter: { type: 'text', id: 'email' },
			},
		}),
		columnHelper.accessor('enabled', {
			id: 'enabled',
			header: formatMessage('enabled'),
			cell: (props) => <EnabledTag enabled={props.getValue()} />,
			meta: {
				filter: {
					type: 'select',
					id: 'enabled',
					items: [
						{ label: formatMessage('no'), value: false },
						{ label: formatMessage('yes'), value: true },
					],
					variant: 'single',
				},
			},
		}),
	] as ColumnDef<User>[]

	const getRowLink = useCallback((user: User) => `/auth/users/${user.id}`, [])

	const title: Message = groupName
		? {
				id: 'auth.group.report.user.title',
				values: {
					groupName,
				},
			}
		: 'auth.user.report.title'

	const downloadSpreadSheet = useDownloadAuthSpreadsheet({
		endpoint: `${ENDPOINTS.AUTH}/${ENDPOINTS.USER}`,
		filename: title,
		params: {
			group: groupName ?? getAuthEqualsFilter(KEYCLOAK_ACCESS_GROUP),
		},
	})

	const downloadReport = useDownloadAuthReport({
		endpoint: `${ENDPOINTS.AUTH}/${ENDPOINTS.USER}`,
		filename: title,
		data: users,
		columns,
		title,
		tableTitle: 'auth.user.title.plural',
		params: {
			group: groupName ?? getAuthEqualsFilter(KEYCLOAK_ACCESS_GROUP),
		},
	})

	return (
		<Table
			columns={columns}
			data={users}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
