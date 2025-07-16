import { LocalizationProvider, TimePicker as MuiTimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { inputLocales } from '..'
import { useLocale } from '@/hooks/locale'

const TimePicker: React.FC<TimePickerProps<Date>> = ({ ...props }) => {
	const { locale } = useLocale()
	const { mui, dateFns } = inputLocales[locale]

	return (
		<LocalizationProvider
			dateAdapter={AdapterDateFns}
			adapterLocale={dateFns}
			localeText={mui.components.MuiLocalizationProvider.defaultProps.localeText}
		>
			<MuiTimePicker
				format='HH:mm:ss'
				views={['hours', 'minutes', 'seconds']}
				sx={{ width: '100%' }}
				{...props}
			/>
		</LocalizationProvider>
	)
}

export default TimePicker
