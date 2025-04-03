import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import CalibrationReadingFieldsContainer, { CalibrationReadingProps } from '../reading'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { DirectPendulumCalibrationForm } from '@/schemas/calibration'

const DirectPendulumCalibrationReadingFields = ({ readingType }: CalibrationReadingProps) => {
	const { control } = useFormContext<DirectPendulumCalibrationForm>()
	const formatMessage = useFormatMessage()

	return (
		<CalibrationReadingFieldsContainer readingType={readingType}>
			<Grid item xs={6}>
				<ControlledTextField
					control={control}
					name={`${readingType}.r`}
					label={formatMessage('instrument.readings.r')}
					type='number'
					nullable
				/>
			</Grid>
		</CalibrationReadingFieldsContainer>
	)
}

export default DirectPendulumCalibrationReadingFields
