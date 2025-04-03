import { Field } from '@/components/ui/field'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { MULT } from '@/constants/symbols'
import { useFormatMessage } from '@/hooks/i18n/format-message'

export const TemperatureFormula = () => {
	const formatMessage = useFormatMessage()

	return (
		<Field labelId='instrument.engineering-value.temperature.name' direction='horizontal' showColon>
			({formatMessage('instrument.engineering-value.meters-sum.acronym')} - R0) {MULT} β
			<UnitOfMeasure message='instrument.engineering-value.temperature.uom' />
		</Field>
	)
}
