import { Field } from '@/components/ui/field'
import { DirectPendulumReading as DirectPendulumReadingType } from '@/schemas/reading'

interface Props {
	reading?: DirectPendulumReadingType
}

export const DirectPendulumReading = ({ reading }: Props) => {
	return (
		<>
			<Field component='grid' labelId='instrument.readings.r'>
				{reading?.r}
			</Field>
		</>
	)
}
