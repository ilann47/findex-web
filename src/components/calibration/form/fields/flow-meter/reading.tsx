import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import CalibrationReadingFieldsContainer, { CalibrationReadingProps } from '../reading'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { FlowMeterCalibrationForm } from '@/schemas/calibration'

const FlowMeterCalibrationReadingFields = ({ readingType }: CalibrationReadingProps) => {
	const { control } = useFormContext<FlowMeterCalibrationForm>()
	const formatMessage = useFormatMessage()

	return (
		<CalibrationReadingFieldsContainer readingType={readingType}>
			<Grid item xs={3}>
				<ControlledTextField
					control={control}
					name={`${readingType}.r1`}
					label={formatMessage('instrument.readings.r1')}
					type='number'
					nullable
				/>
			</Grid>
			<Grid item xs={3}>
				<ControlledTextField
					control={control}
					name={`${readingType}.t1`}
					label={formatMessage('instrument.readings.t1')}
					type='number'
					nullable
				/>
			</Grid>
		</CalibrationReadingFieldsContainer>
	)
}

export default FlowMeterCalibrationReadingFields
