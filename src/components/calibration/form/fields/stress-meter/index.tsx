import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ConcreteTensometerCalibrationReadingFields from './reading'
import ControlledTextField from '../../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ConcreteTensometerCalibration } from '@/schemas/calibration'

const ConcreteTensometerCalibrationFields = () => {
	const { control } = useFormContext<ConcreteTensometerCalibration>()
	const formatMessage = useFormatMessage()

	return (
		<>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='r1r20'
					label={formatMessage('instrument.calibration.r1r20')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='r1r2r0'
					label={formatMessage('instrument.calibration.r1r2r0')}
					type='number'
				/>
			</Grid>

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
					name='beta'
					label={formatMessage('instrument.calibration.beta')}
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
					name='vecc'
					label={formatMessage('instrument.calibration.vecc')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='vdrl'
					label={formatMessage('instrument.calibration.vdrl')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='r5'
					label={formatMessage('instrument.calibration.r5')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='td80'
					label={formatMessage('instrument.calibration.td80')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='ex'
					label={formatMessage('instrument.calibration.ex')}
					type='number'
				/>
			</Grid>

			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name='ac'
					label={formatMessage('instrument.calibration.ac')}
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

			<ConcreteTensometerCalibrationReadingFields readingType='prioriReading' />
			<ConcreteTensometerCalibrationReadingFields readingType='posterioriReading' />
		</>
	)
}

export default ConcreteTensometerCalibrationFields
