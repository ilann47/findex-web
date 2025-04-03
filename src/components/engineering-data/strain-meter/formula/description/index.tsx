import { Text } from '@/components/ui/text'

export const DeformimeterFormulaDescription = () => {
	return (
		<>
			<Text message='instrument.engineering-value.formula.description-title' variant='h3' fontSize={18} />

			<Text
				message={{
					id: 'instrument.engineering-value.formula.is-read-value.plural',
					values: { values: 'VR, VRL1, VP e VR5' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.initial-zero',
					values: { value: 'R1R20' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.initial-tax',
					values: { value: 'R1R2R0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.programming-parameter',
					values: { value: 'Vecc' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.service-parameter',
					values: { value: 'VdRL', magnitude: '' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.service-parameter',
					values: { value: 'R5', magnitude: '(ohm)' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.zero-degree-resistance',
					values: { value: 'R0' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.temperature.factor',
					values: { value: 'β' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.calibration-factor.certificate',
					values: { value: 'F' },
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.temperature.correction-factor',
					values: { value: 'B' },
				}}
			/>
		</>
	)
}
