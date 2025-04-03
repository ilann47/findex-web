import { BarometerFormulaDescription } from './description'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { MULT } from '@/constants/symbols'

export const BarometerFormula = () => (
	<>
		<Field labelId='instrument.engineering-value.pressure.name' direction='horizontal' showColon>
			(R {MULT} m + c)
			<UnitOfMeasure message='instrument.engineering-value.pressure.uom' />
		</Field>

		<BarometerFormulaDescription />
	</>
)
