import { Field } from '@/components/ui/field'
import { Calibration } from '@/schemas/calibration'

interface Props {
	calibration?: Calibration
}

export const CalibrationDateFields = ({ calibration }: Props) => {
	return (
		<>
			<Field component='grid' labelId='start-date'>
				{calibration?.startDate.toString()}
			</Field>
			<Field component='grid' labelId='end-date'>
				{calibration?.endDate?.toString()}
			</Field>
		</>
	)
}
