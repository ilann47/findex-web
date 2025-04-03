import { useQuery } from '@tanstack/react-query'

import { useFormatMessage } from '../i18n/format-message'
import { RequestParams } from '@/service'
import { Message } from '@/types/i18n'
import { getFile } from '@/utils/file'

export interface useFileParams {
	endpoint: string
	filename: Message
	enabled?: boolean
	params?: RequestParams
}

export const useGetFile = ({ endpoint, filename, enabled, params }: useFileParams) => {
	const formatMessage = useFormatMessage()

	const {
		data: file,
		isError,
		...queryReturn
	} = useQuery({
		queryKey: [endpoint],
		queryFn: () => getFile(endpoint, formatMessage(filename), params),
		enabled,
	})

	return {
		file: isError ? null : file,
		...queryReturn,
	}
}
