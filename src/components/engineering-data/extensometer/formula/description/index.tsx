import { Text } from '@/components/ui/text'

export const ExtensometerFormulaDescription = () => {
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
					id: 'instrument.engineering-value.formula.calibration-factor.report',
					values: { value: 'G' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.initial-position',
					values: { value: 'R0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.temperature.initial',
					values: { value: 'T0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.multiplication-factor',
					values: { value: 'M' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.manual-constant',
					values: { value: 'BK' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.offset.itaipu',
					values: { value: 'L' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.is-read-value.plural',
					values: { values: 'R1 e T1' },
				}}
			/>
			<Text message='instrument.engineering-value.formula.negative' />
		</>
	)
}
