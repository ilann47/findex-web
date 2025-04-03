import { Typography } from '@mui/material'

import { FlowMeterFormulaDescription } from './description'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const FlowMeterFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<Field labelId='instrument.engineering-value.water-level.name' direction='horizontal' showColon>
				<Typography>
					H0 + ((A {MULT} R0<sup>2</sup>)) + (B {MULT} R0) + C) {MULT} (1 - (0.0002 {MULT} T0)) - ((A
					{MULT} R1<sup>2</sup>) + (B {MULT} R1) + C) {MULT} (1 - (0.0002 {MULT} T1))
					<UnitOfMeasure message='instrument.engineering-value.water-level.uom' />
				</Typography>
			</Field>

			<Field labelId='instrument.engineering-value.trapezoidal-flow.name' direction='horizontal' showColon>
				<Typography>
					K {MULT} L {MULT} ({formatMessage('instrument.engineering-value.water-level.acronym')} / F)
					<sup>1.5</sup>
					<UnitOfMeasure message='instrument.engineering-value.trapezoidal-flow.uom' />
				</Typography>
			</Field>

			<Field labelId='instrument.engineering-value.triangular-flow.name' direction='horizontal' showColon>
				<Typography>
					K {MULT} ({formatMessage('instrument.engineering-value.water-level.acronym')} / F)<sup>2.5</sup>
					<UnitOfMeasure message='instrument.engineering-value.triangular-flow.uom' />
				</Typography>
			</Field>
			<FlowMeterFormulaDescription />
		</>
	)
}
