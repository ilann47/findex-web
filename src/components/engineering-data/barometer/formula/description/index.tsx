import { Text } from '@/components/ui/text'

export const BarometerFormulaDescription = () => {
	return (
		<>
			<Text message='instrument.engineering-value.formula.description-title' variant='h3' fontSize={18} />

			<Text
				message={{ id: 'instrument.engineering-value.formula.is-read-value.singular', values: { value: 'R' } }}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.calibration-factor.default',
					values: { value: 'm', magnitude: '(hPa/V)' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.offset.default',
					values: { value: 'c', magnitude: '(hPa)' },
				}}
			/>
		</>
	)
}
