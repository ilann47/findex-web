import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import BarometerCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { BarometerCalibrationForm } from '@/schemas/calibration'

const BarometerCalibrationFields = () => {
	const { control } = useFormContext<BarometerCalibrationForm>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={3}>
				<ControlledTextField
					control={control}
					name='m'
					label={formatMessage('instrument.calibration.m')}
					type='number'
				/>
			</Grid>
			<Grid item xs={3}>
				<ControlledTextField
					control={control}
					name='c'
					label={formatMessage('instrument.calibration.c')}
					type='number'
				/>
			</Grid>

			<BarometerCalibrationReadingFields readingType='prioriReading' />
			<BarometerCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default BarometerCalibrationFields
