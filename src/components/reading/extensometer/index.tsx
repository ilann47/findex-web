import { Field } from '@/components/ui/field'
import { ExtensometerReading as ExtensometerReadingType } from '@/schemas/reading'

interface Props {
	reading?: ExtensometerReadingType
}

export const ExtensometerReading = ({ reading }: Props) => {
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
