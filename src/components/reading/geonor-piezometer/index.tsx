import { Field } from '@/components/ui/field'
import { GeonorPiezometerReading as GeonorPiezometerReadingType } from '@/schemas/reading'

interface Props {
	reading?: GeonorPiezometerReadingType
}

export const GeonorPiezometerReading = ({ reading }: Props) => {
	return (
		<>
			<Field component='grid' labelId='instrument.readings.r1'>
				{reading?.r1}
			</Field>
		</>
	)
}
