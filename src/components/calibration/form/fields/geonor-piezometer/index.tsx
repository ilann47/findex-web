import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import GeonorPiezometerCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { GeonorPiezometerCalibration } from '@/schemas/calibration'

const GeonorPiezometerCalibrationFields = () => {
	const { control } = useFormContext<GeonorPiezometerCalibration>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='r0'
					label={formatMessage('instrument.calibration.r0')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='k'
					label={formatMessage('instrument.calibration.k')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='f'
					label={formatMessage('instrument.calibration.f')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='c'
					label={formatMessage('instrument.calibration.c')}
					type='number'
				/>
			</Grid>

			<GeonorPiezometerCalibrationReadingFields readingType='prioriReading' />
			<GeonorPiezometerCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default GeonorPiezometerCalibrationFields
