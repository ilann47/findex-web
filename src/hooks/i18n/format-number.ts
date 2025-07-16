import { useIntl } from 'react-intl'

export const useFormatNumber = () => {
	const { formatNumber } = useIntl()

	return (number: number) => {
		return formatNumber(number, {
			maximumFractionDigits: 6,
		})
	}
}
