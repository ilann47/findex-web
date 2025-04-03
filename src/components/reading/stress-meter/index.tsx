import { Field } from '@/components/ui/field'
import { ConcreteTensometerReading as ConcreteTensometerReadingType } from '@/schemas/reading'

interface Props {
	reading?: ConcreteTensometerReadingType
}

export const ConcreteTensometerReading = ({ reading }: Props) => {
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
