import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import DirectPendulumCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { DirectPendulumCalibration } from '@/schemas/calibration'

const DirectPendulumCalibrationFields = () => {
	const { control } = useFormContext<DirectPendulumCalibration>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='x1'
					label={formatMessage('instrument.calibration.x1')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='x2'
					label={formatMessage('instrument.calibration.x2')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='y1'
					label={formatMessage('instrument.calibration.y1')}
					type='number'
				/>
			</Grid>

			<Grid item xs={2}>
				<ControlledTextField
					control={control}
					name='y2'
					label={formatMessage('instrument.calibration.y2')}
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
					name='l'
					label={formatMessage('instrument.calibration.l')}
					type='number'
				/>
			</Grid>

			<DirectPendulumCalibrationReadingFields readingType='prioriReading' />
			<DirectPendulumCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default DirectPendulumCalibrationFields
