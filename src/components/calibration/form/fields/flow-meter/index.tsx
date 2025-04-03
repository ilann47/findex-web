import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import FlowMeterCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { FlowMeterCalibration } from '@/schemas/calibration'

const FlowMeterCalibrationFields = () => {
	const { control } = useFormContext<FlowMeterCalibration>()
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
					name='k'
					label={formatMessage('instrument.calibration.k')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='f'
					label={formatMessage('instrument.calibration.f')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='h0'
					label={formatMessage('instrument.calibration.h0')}
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
					name='l'
					label={formatMessage('instrument.calibration.l')}
					type='number'
				/>
			</Grid>

			<FlowMeterCalibrationReadingFields readingType='prioriReading' />
			<FlowMeterCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default FlowMeterCalibrationFields
