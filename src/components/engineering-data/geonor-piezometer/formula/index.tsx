import { GeonorPiezometerFormulaDescription } from './description'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { DIVIDE, MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const GeonorPiezometerFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<Field
				labelId='instrument.engineering-value.relative-pressure.name-acronym'
				direction='horizontal'
				showColon
			>
				K {MULT} F {MULT} ( R0<sup>2</sup> - R1<sup>2</sup> ) {DIVIDE} 1000
				<UnitOfMeasure message='instrument.engineering-value.relative-pressure.uom' />
			</Field>

			<Field labelId='instrument.engineering-value.water-level.name-acronym' direction='horizontal' showColon>
				{formatMessage('instrument.engineering-value.relative-pressure.acronym')} + C
				<UnitOfMeasure message='instrument.engineering-value.water-level.uom' />
			</Field>

			<GeonorPiezometerFormulaDescription />
		</>
	)
}
