import { Text } from '@/components/ui/text'

export const GeonorPiezometerFormulaDescription = () => {
	return (
		<>
			<Text message='instrument.engineering-value.formula.description-title' variant='h3' fontSize={18} />

			<Text
				message={{
					id: 'instrument.engineering-value.formula.is-read-value.singular',
					values: { value: 'R1' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.initial-reading',
					values: { value: 'R0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.calibration-factor.default',
					values: { value: 'K', magnitude: '(Dígito)' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.conversion.factor',
					values: { value: 'F' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.level.sea',
					values: { value: 'C' },
				}}
			/>
		</>
	)
}
