import { useIntl } from 'react-intl'

import { Message } from '@/types/i18n'

export const useFormatMessage = () => {
	const { formatMessage } = useIntl()

	return (message: Message) => {
		return typeof message == 'string'
			? formatMessage({ id: message })
			: formatMessage({ id: message.id }, message.values)
	}
}
