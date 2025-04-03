import { DateTimePickerProps, LocalizationProvider, DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { esES, ptBR } from '@mui/x-date-pickers/locales'
import { es as esDateFns, ptBR as ptBRDateFns } from 'date-fns/locale'

import { useLocale } from '@/hooks/locale'

export const inputLocales = {
	pt: { mui: ptBR, dateFns: ptBRDateFns },
	es: { mui: esES, dateFns: esDateFns },
}

const DateTimePicker: React.FC<DateTimePickerProps<Date>> = ({ ...props }) => {
	const { locale } = useLocale()
	const { mui, dateFns } = inputLocales[locale]

	return (
		<LocalizationProvider
			dateAdapter={AdapterDateFns}
			adapterLocale={dateFns}
			localeText={mui.components.MuiLocalizationProvider.defaultProps.localeText}
		>
			<MuiDateTimePicker format='dd/MM/yyyy HH:mm:ss' {...props} />
		</LocalizationProvider>
	)
}

export default DateTimePicker
