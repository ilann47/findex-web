import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ElectricJointMeterCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ElectricJointMeterCalibrationForm } from '@/schemas/calibration'

const ElectricJointMeterCalibrationFields = () => {
	const { control } = useFormContext<ElectricJointMeterCalibrationForm>()
	const formatMessage = useFormatMessage()

	return (
		<>
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
					name='r1r2r0'
					label={formatMessage('instrument.calibration.r1r2r0')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='vecc'
					label={formatMessage('instrument.calibration.vecc')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='vdrl'
					label={formatMessage('instrument.calibration.vdrl')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='r5'
					label={formatMessage('instrument.calibration.r5')}
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
					name='beta'
					label={formatMessage('instrument.calibration.beta')}
					type='number'
				/>
			</Grid>

			<Grid item xs={4}></Grid>

			<ElectricJointMeterCalibrationReadingFields readingType='prioriReading' />
			<ElectricJointMeterCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default ElectricJointMeterCalibrationFields
