import { Text } from '@/components/ui/text'

export const DirectPendulumFormulaDescription = () => {
	return (
		<>
			<Text message='instrument.engineering-value.formula.description-title' variant='h3' fontSize={18} />

			<Text
				message={{
					id: 'instrument.engineering-value.formula.is-read-value.singular',
					values: { value: 'R' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.offset.correction',
					values: { value: 'L' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.gage-factor',
					values: { value: 'm' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.offset.installation',
					values: { value: 'c' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.one',
					values: { value: 'k' },
				}}
			/>
		</>
	)
}
