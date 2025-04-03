import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import CalibrationReadingFieldsContainer, { CalibrationReadingProps } from '../reading'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { GeonorPiezometerCalibrationForm } from '@/schemas/calibration'

const GeonorPiezometerCalibrationReadingFields = ({ readingType }: CalibrationReadingProps) => {
	const { control } = useFormContext<GeonorPiezometerCalibrationForm>()
	const formatMessage = useFormatMessage()

	return (
		<CalibrationReadingFieldsContainer readingType={readingType}>
			<Grid item xs={6}>
				<ControlledTextField
					control={control}
					name={`${readingType}.r1`}
					label={formatMessage('instrument.readings.r1')}
					type='number'
					nullable
				/>
			</Grid>
		</CalibrationReadingFieldsContainer>
	)
}

export default GeonorPiezometerCalibrationReadingFields
