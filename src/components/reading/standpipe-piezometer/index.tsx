import { Field } from '@/components/ui/field'
import { StandpipePiezometerReading as StandpipePiezometerReadingType } from '@/schemas/reading'

interface Props {
	reading?: StandpipePiezometerReadingType
}

export const StandpipePiezometerReading = ({ reading }: Props) => {
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
