import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import DeformimeterCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { DeformimeterCalibration } from '@/schemas/calibration'

const DeformimeterCalibrationFields = () => {
	const { control } = useFormContext<DeformimeterCalibration>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='r1r20'
					label={formatMessage('instrument.calibration.r1r20')}
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
					name='b'
					label={formatMessage('instrument.calibration.b')}
					type='number'
				/>
			</Grid>

			<DeformimeterCalibrationReadingFields readingType='prioriReading' />
			<DeformimeterCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default DeformimeterCalibrationFields
