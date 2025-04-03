import { Field } from '@/components/ui/field'
import { FlowMeterReading as FlowMeterReadingType } from '@/schemas/reading'

interface Props {
	reading: FlowMeterReadingType
}

export const FlowMeterReading = ({ reading }: Props) => {
	return (
		<>
			<Field component='grid' labelId='instrument.readings.r1'>
				{reading?.r1}
			</Field>
			<Field component='grid' labelId='instrument.readings.t1'>
				{reading?.t1}
			</Field>
		</>
	)
}
