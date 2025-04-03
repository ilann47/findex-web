import { useIntl } from 'react-intl'

export const useFormatDate = () => {
	const { formatDate } = useIntl()

	return (date: string | number | Date | undefined, showTime = true, options?: Intl.DateTimeFormatOptions) => {
		return formatDate(date, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			...(showTime && { hour: '2-digit', minute: '2-digit' }),
			...options,
		})
	}
}
