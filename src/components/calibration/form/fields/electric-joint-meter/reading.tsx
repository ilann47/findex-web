import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import CalibrationReadingFieldsContainer, { CalibrationReadingProps } from '../reading'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ElectricJointMeterCalibrationForm } from '@/schemas/calibration'

const ElectricJointMeterCalibrationReadingFields = ({ readingType }: CalibrationReadingProps) => {
	const { control } = useFormContext<ElectricJointMeterCalibrationForm>()
	const formatMessage = useFormatMessage()

	return (
		<CalibrationReadingFieldsContainer readingType={readingType}>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name={`${readingType}.vr`}
					label={formatMessage('instrument.readings.vr')}
					type='number'
					nullable
				/>
			</Grid>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name={`${readingType}.vrl1`}
					label={formatMessage('instrument.readings.vrl1')}
					type='number'
					nullable
				/>
			</Grid>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name={`${readingType}.vp`}
					label={formatMessage('instrument.readings.vp')}
					type='number'
					nullable
				/>
			</Grid>
			<Grid item xs={1.5}>
				<ControlledTextField
					control={control}
					name={`${readingType}.vr5`}
					label={formatMessage('instrument.readings.vr5')}
					type='number'
					nullable
				/>
			</Grid>
		</CalibrationReadingFieldsContainer>
	)
}

export default ElectricJointMeterCalibrationReadingFields
