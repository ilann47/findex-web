import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { DIVIDE, MULT } from '@/constants/symbols'

export const MetersRatioFormula = () => {
	return (
		<Field labelId='instrument.engineering-value.meters-ratio.name' direction='horizontal' showColon>
			((Vecc {DIVIDE} 2) - (VRL1 {MULT} VdRL) - VP) {MULT} 100 {DIVIDE} ((Vecc {DIVIDE} 2) - VRL1 + VP - VR5)
			<UnitOfMeasure message='instrument.engineering-value.meters-ratio.uom' />
		</Field>
	)
}
