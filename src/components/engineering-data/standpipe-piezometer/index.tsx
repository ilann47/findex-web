import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { StandpipePiezometerEngineeringData as StandpipePiezometerEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: StandpipePiezometerEngineeringDataType
}

export const StandpipePiezometerEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.absolute-pressure.name'>
				{engineeringData?.absolutePressure}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.relative-pressure.name'>
				{engineeringData?.relativePressure}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.sea-level-elevation.name'>
				{engineeringData?.seaLevelElevation}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.tube-water-level-distance.name'>
				{engineeringData?.tubeWaterLevelDistance}
			</Field>
		</StyledGridContainer>
	)
}
