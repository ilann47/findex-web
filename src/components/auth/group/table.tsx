import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { KEYCLOAK_GROUP_PREFIX } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { useDownloadAuthReport } from '@/hooks/file/download-report'
import { useDownloadAuthSpreadsheet } from '@/hooks/file/download-spreadsheet'
import { useAuthGetPageable } from '@/hooks/get/get-auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Group, User } from '@/schemas/auth'
import { Message } from '@/types/i18n'
import { getAuthLikeFilter } from '@/utils/auth'

interface Props {
	user?: User
	isLoading?: boolean
}

export const GroupsTable = ({ user, isLoading: isLoadingProp }: Props) => {
	const requestParams = {
		...(user?.id && { idUser: user?.id }),
		...(!user?.id && { name: getAuthLikeFilter(KEYCLOAK_GROUP_PREFIX) }),
	}

	const {
		data: groups,
		totalElements,
		isLoading,
	} = useAuthGetPageable<Group>({
		endpoint: ENDPOINTS.GROUP,
		requestParams,
		enabled: !isLoadingProp,
	})

	const formatMessage = useFormatMessage()
	const columnHelper = createColumnHelper<Group>()

	const columns: ColumnDef<Group>[] = [
		columnHelper.accessor('name', {
			id: 'name',
			header: formatMessage('name'),
		}),
	] as ColumnDef<Group>[]

	const getRowLink = useCallback((group: Group) => `/auth/groups/${group.id}`, [])

	const title: Message = user?.id
		? { id: 'auth.user.report.group.title', values: { userName: user.name } }
		: 'auth.group.report.title'

	const downloadSpreadSheet = useDownloadAuthSpreadsheet({
		endpoint: `${ENDPOINTS.AUTH}/${ENDPOINTS.GROUP}`,
		filename: title,
		params: requestParams,
	})

	const downloadReport = useDownloadAuthReport({
		endpoint: `${ENDPOINTS.AUTH}/${ENDPOINTS.GROUP}`,
		filename: title,
		data: groups,
		columns,
		title,
		tableTitle: 'auth.group.title.plural',
		params: requestParams,
	})

	return (
		<Table
			columns={columns}
			data={groups}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoadingProp || isLoading}
			downloadSpreadSheet={downloadSpreadSheet}
			downloadReport={downloadReport}
		/>
	)
}
