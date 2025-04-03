import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import StandpipePiezometerCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { StandpipePiezometerCalibration } from '@/schemas/calibration'

const StandpipePiezometerCalibrationFields = () => {
	const { control } = useFormContext<StandpipePiezometerCalibration>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='a'
					label={formatMessage('instrument.calibration.a')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='b'
					label={formatMessage('instrument.calibration.b')}
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
					name='t0'
					label={formatMessage('instrument.calibration.t0')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='s0'
					label={formatMessage('instrument.calibration.s0')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='q'
					label={formatMessage('instrument.calibration.q')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='q2'
					label={formatMessage('instrument.calibration.q2')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='alfa'
					label={formatMessage('instrument.calibration.alfa')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='qf'
					label={formatMessage('instrument.calibration.qf')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='l'
					label={formatMessage('instrument.calibration.l')}
					type='number'
				/>
			</Grid>

			<StandpipePiezometerCalibrationReadingFields readingType='prioriReading' />
			<StandpipePiezometerCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default StandpipePiezometerCalibrationFields
