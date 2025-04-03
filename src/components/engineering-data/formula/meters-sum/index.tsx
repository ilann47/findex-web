import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { DIVIDE, MULT } from '@/constants/symbols'

export const MetersSumFormula = () => {
	return (
		<Field labelId='instrument.engineering-value.meters-sum.name' direction='horizontal' showColon>
			(((Vecc {DIVIDE} 2) - (VRL1 {MULT} VdRL) - VP - VR) + ((Vecc {DIVIDE} 2) - VRL1 + VP - VR5 - VR)) {DIVIDE}{' '}
			(VR5 {DIVIDE} R5)
			<UnitOfMeasure message='instrument.engineering-value.meters-sum.uom' />
		</Field>
	)
}
