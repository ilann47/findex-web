import { Text } from '@/components/ui/text'

export const FlowMeterFormulaDescription = () => {
	return (
		<>
			<Text message='instrument.engineering-value.formula.description-title' variant='h3' fontSize={18} />
			<Text
				message={{
					id: 'instrument.engineering-value.formula.polynomial-factors',
					values: { value: 'A, B e C' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.is-read-value.plural',
					values: { values: 'R1 e T1' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.level.water',
					values: { value: 'H0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.value-at-commissioning',
					values: { value: 'R0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.temperature.value.at-commissioning',
					values: { value: 'T0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.flow-factor',
					values: { value: 'K' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.base-width',
					values: { value: 'L' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.conversion.constant',
					values: { fromUnit: 'mm', toUnit: 'cm', constant: ' ', value: 'F' },
				}}
			/>
		</>
	)
}
