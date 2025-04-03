import { InvertedPendulumFormulaDescription } from './description'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { DIVIDE, MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const InvertedPendulumFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<Field labelId='instrument.engineering-value.gage-factor.name-acronym' direction='horizontal' showColon>
				(y2 - y1) {DIVIDE} (x2 - x1)
				<UnitOfMeasure message='instrument.engineering-value.gage-factor.uom' />
			</Field>

			<Field labelId='instrument.engineering-value.offset.name-acronym' direction='horizontal' showColon>
				(y1 - {formatMessage('instrument.engineering-value.gage-factor.acronym')} {MULT} x1)
				<UnitOfMeasure message='instrument.engineering-value.offset.uom' />
			</Field>

			<Field
				labelId='instrument.engineering-value.absolute-displacement.name-acronym'
				direction='horizontal'
				showColon
			>
				(R {MULT} {formatMessage('instrument.engineering-value.gage-factor.acronym')} +{' '}
				{formatMessage('instrument.engineering-value.offset.acronym')}) {MULT} K
				<UnitOfMeasure message='instrument.engineering-value.absolute-displacement.uom' />
			</Field>

			<Field
				labelId='instrument.engineering-value.relative-displacement.name-acronym'
				direction='horizontal'
				showColon
			>
				{formatMessage('instrument.engineering-value.absolute-displacement.acronym')} + L
				<UnitOfMeasure message='instrument.engineering-value.relative-displacement.uom' />
			</Field>

			<InvertedPendulumFormulaDescription />
		</>
	)
}
