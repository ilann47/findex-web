import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ExtensometerCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ExtensometerCalibration } from '@/schemas/calibration'

const ExtensometerCalibrationFields = () => {
	const { control } = useFormContext<ExtensometerCalibration>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='a'
					label={formatMessage('instrument.calibration.a')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='b'
					label={formatMessage('instrument.calibration.b')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='c'
					label={formatMessage('instrument.calibration.c')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='g'
					label={formatMessage('instrument.calibration.g')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='r0'
					label={formatMessage('instrument.calibration.r0')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='t0'
					label={formatMessage('instrument.calibration.t0')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='m'
					label={formatMessage('instrument.calibration.m')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='bk'
					label={formatMessage('instrument.calibration.bk')}
					type='number'
				/>
			</Grid>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='l'
					label={formatMessage('instrument.calibration.l')}
					type='number'
				/>
			</Grid>

			<ExtensometerCalibrationReadingFields readingType='prioriReading' />
			<ExtensometerCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default ExtensometerCalibrationFields
