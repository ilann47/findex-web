import { useFileParams } from './get-file'
import { useFiltering } from '../filter/filtering'
import { useFormatMessage } from '../i18n/format-message'
import { useLoading } from '../loading'
import { KEYCLOAK_ID_CLIENT, KEYCLOAK_REALM } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { downloadFile, getFile } from '@/utils/file'

export const useDownloadSpreadsheet = ({ endpoint, filename: filenameId, params }: Omit<useFileParams, 'enabled'>) => {
	const { filters } = useFiltering()
	const { startLoading, stopLoading } = useLoading()
	const formatMessage = useFormatMessage()

	return async () => {
		startLoading()
		const file = await getFile(`${endpoint}/${ENDPOINTS.SPREADSHEET}`, formatMessage(filenameId), {
			...filters,
			...params,
		})
		stopLoading()
		file && downloadFile(file)
	}
}

export const useDownloadAuthSpreadsheet = (params: Omit<useFileParams, 'enabled'>) => {
	return useDownloadSpreadsheet({
		...params,
		params: {
			...params.params,
			realm: KEYCLOAK_REALM,
			idClient: KEYCLOAK_ID_CLIENT,
		},
	})
}
