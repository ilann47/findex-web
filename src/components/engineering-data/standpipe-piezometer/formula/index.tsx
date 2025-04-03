import { Typography } from '@mui/material'

import { StandpipePiezometerFormulaDescription } from './description'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { DIVIDE, MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const StandpipePiezometerFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<Field
				labelId='instrument.engineering-value.absolute-pressure.name-acronym'
				direction='horizontal'
				showColon
			>
				<Typography>
					((A {MULT} R1<sup>2</sup>) + (B {MULT} R1) + C + (K {MULT} (T1 - T0))) {MULT} K1
					<UnitOfMeasure message='instrument.engineering-value.absolute-pressure.uom' />
				</Typography>
			</Field>

			<Field
				labelId='instrument.engineering-value.relative-pressure.name-acronym'
				direction='horizontal'
				showColon
			>
				<Typography>
					(((A {MULT} R1<sup>2</sup>) + (B {MULT} R1) + C + (K {MULT} (T1 - T0)) - ((S1 - S0) {MULT} K2)){' '}
					{MULT} K1) + Z + L
					<UnitOfMeasure message='instrument.engineering-value.relative-pressure.uom' />
				</Typography>
			</Field>

			<Field
				labelId='instrument.engineering-value.sea-level-elevation.name-acronym'
				direction='horizontal'
				showColon
			>
				{formatMessage('instrument.engineering-value.relative-pressure.acronym')} + Q2 – Z
				<UnitOfMeasure message='instrument.engineering-value.sea-level-elevation.uom' />
			</Field>

			<Field
				labelId='instrument.engineering-value.tube-water-level-distance.name-acronym'
				direction='horizontal'
				showColon
			>
				({formatMessage('instrument.engineering-value.sea-level-elevation.acronym')} - Q) {DIVIDE} (cos ((ALFA{' '}
				{MULT} PI) / 180.0))
				<UnitOfMeasure message='instrument.engineering-value.tube-water-level-distance.uom' />
			</Field>

			<StandpipePiezometerFormulaDescription />
		</>
	)
}
