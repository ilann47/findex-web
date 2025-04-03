import { ExtensometerFormulaDescription } from './description'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const ExtensometerFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<Field
				labelId='instrument.engineering-value.absolute-displacement.name-acronym'
				direction='horizontal'
				showColon
			>
				{`{ [(A ${MULT} R1 ${MULT} R1) + (B ${MULT} R1) + C] - (A ${MULT} (R0 ${MULT} R0) + (B ${MULT} R0) + C) + (T1 - T0) ${MULT} [(R1 ${MULT} M + BK) ${MULT} G] } ${MULT} (-1)`}
				<UnitOfMeasure message='instrument.engineering-value.absolute-displacement.uom' />
			</Field>

			<Field
				labelId='instrument.engineering-value.relative-displacement.name-acronym'
				direction='horizontal'
				showColon
			>
				(L = vazio) ? {formatMessage('instrument.engineering-value.absolute-displacement.acronym')} :{' '}
				{formatMessage('instrument.engineering-value.absolute-displacement.acronym')} + L
				<UnitOfMeasure message='instrument.engineering-value.relative-displacement.uom' />
			</Field>

			<ExtensometerFormulaDescription />
		</>
	)
}
