import { Text } from '@/components/ui/text'

export const StandpipePiezometerFormulaDescription = () => {
	return (
		<>
			<Text message='instrument.engineering-value.formula.description-title' variant='h3' fontSize={18} />

			<Text
				message={{
					id: 'instrument.engineering-value.formula.conversion.constant',
					values: {
						value: 'K1',
						fromUnit: 'Kpa',
						toUnit: 'm.c.a',
						constant: '0,10206',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.conversion.constant',
					values: {
						value: 'K2',
						fromUnit: 'mbar',
						toUnit: 'kpa',
						constant: '0,1',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.is-read-value.plural',
					values: {
						values: 'R1 e T1',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.polynomial-factors',
					values: {
						value: 'A, B, C e K',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.temperature.value.at-installation',
					values: {
						value: 'T0',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.pressure.at-installation',
					values: {
						value: 'S0',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.pressure.at-barometer-reading',
					values: {
						value: 'S1',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.level.tube_top',
					values: {
						value: 'Q',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.level.installation',
					values: {
						value: 'Q2',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.inclination-angle',
					values: {
						value: 'ALFA',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.alignment-correction',
					values: {
						value: 'Z',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.level.manual_installation',
					values: {
						value: 'Qf',
					},
				}}
			/>
			<Text
				message={{
					id: 'instrument.engineering-value.formula.offset.adjustment',
					values: {
						value: 'L',
					},
				}}
			/>
		</>
	)
}
