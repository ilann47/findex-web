import { DeformimeterFormulaDescription } from './description'
import { MetersRatioFormula } from '../../formula/meters-ratio'
import { MetersSumFormula } from '../../formula/meters-sum'
import { TemperatureFormula } from '../../formula/temperature'
import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const DeformimeterFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<>
			<MetersSumFormula />

			<MetersRatioFormula />

			<TemperatureFormula />

			<Field labelId='instrument.engineering-value.tension.name' direction='horizontal' showColon>
				((({formatMessage('instrument.engineering-value.meters-ratio.acronym')} - R1R2R0) {MULT} f) + ( ({' '}
				{formatMessage('instrument.engineering-value.meters-sum.acronym')} - R1R20 ) {MULT} β) {MULT} b )
				<UnitOfMeasure message='instrument.engineering-value.tension.uom' />
			</Field>

			<DeformimeterFormulaDescription />
		</>
	)
}
