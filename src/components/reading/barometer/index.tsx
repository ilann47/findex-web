import { Field } from '@/components/ui/field'
import { BarometerReading as BarometerReadingType } from '@/schemas/reading'

interface Props {
	reading?: BarometerReadingType
}

export const BarometerReading = ({ reading }: Props) => {
	return (
		<>
			<Field component='grid' labelId='instrument.readings.r'>
				{reading?.r}
			</Field>
		</>
	)
}
