import { Field } from '@/components/ui/field'
import { DeformimeterReading as DeformimeterReadingType } from '@/schemas/reading'

interface Props {
	reading?: DeformimeterReadingType
}

export const DeformimeterReading = ({ reading }: Props) => {
	return (
		<>
			<Field component='grid' labelId='instrument.readings.vr'>
				{reading?.vr}
			</Field>
			<Field component='grid' labelId='instrument.readings.vrl1'>
				{reading?.vrl1}
			</Field>
			<Field component='grid' labelId='instrument.readings.vp'>
				{reading?.vp}
			</Field>
			<Field component='grid' labelId='instrument.readings.vr5'>
				{reading?.vr5}
			</Field>
		</>
	)
}
