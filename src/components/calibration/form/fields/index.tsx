import { Grid, Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { SpecificCalibrationFields } from './specific'
import { GridContainer } from '@/components/ui/container/grid'
import ControlledDateTimePicker from '@/components/ui/inputs/date-time/controlled'
import ControlledFileInput from '@/components/ui/inputs/file-input/controlled'
import { Text } from '@/components/ui/text'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { CalibrationForm } from '@/schemas/calibration'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	instrumentType: InstrumentType
	type: 'create' | 'update'
}

const CalibrationFields = ({ instrumentType, type }: Props) => {
	const { control, watch } = useFormContext<CalibrationForm>()
	const formatMessage = useFormatMessage()

	const calibrationSheet = watch('calibrationSheet')

	return (
		<Stack direction={calibrationSheet ? 'row' : 'column'} gap={3}>
			<GridContainer columns={6}>
				<Grid item xs={type == 'update' ? 3 : 6}>
					<ControlledDateTimePicker control={control} name='startDate' label={formatMessage('start-date')} />
				</Grid>
				{type == 'update' && (
					<Grid item xs={3}>
						<ControlledDateTimePicker
							control={control}
							name='endDate'
							label={formatMessage('end-date')}
							clearable
						/>
					</Grid>
				)}
				<SpecificCalibrationFields instrumentType={instrumentType} />
			</GridContainer>

			<Stack>
				<Text message='instrument.calibration.calibration-sheet' mb={1} variant='h4' />
				<ControlledFileInput control={control} name='calibrationSheet' type='pdf' />
			</Stack>
		</Stack>
	)
}

export default CalibrationFields
