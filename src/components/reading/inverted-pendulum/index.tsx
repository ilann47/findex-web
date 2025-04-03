import { Field } from '@/components/ui/field'
import { InvertedPendulumReading as InvertedPendulumReadingType } from '@/schemas/reading'

interface Props {
	reading?: InvertedPendulumReadingType
}

export const InvertedPendulumReading = ({ reading }: Props) => {
	return (
		<>
			<Field component='grid' labelId='instrument.readings.r'>
				{reading?.r}
			</Field>
		</>
	)
}
