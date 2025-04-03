import { EletricJointMeterFormulaDescription } from './description'
import { MetersRatioFormula } from '../../formula/meters-ratio'
import { MetersSumFormula } from '../../formula/meters-sum'
import { TemperatureFormula } from '../../formula/temperature'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const ElectricJointMeterFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<MetersSumFormula />

			<MetersRatioFormula />

			<TemperatureFormula />

			<Field labelId='instrument.engineering-value.displacement.name' direction='horizontal' showColon>
				( ( {formatMessage('instrument.engineering-value.meters-ratio.name-acronym')} - r1r2r0 ) {MULT} f ){' '}
				{MULT}
				1000
				<UnitOfMeasure message='instrument.engineering-value.displacement.uom' />
			</Field>

			<EletricJointMeterFormulaDescription />
		</>
	)
}
