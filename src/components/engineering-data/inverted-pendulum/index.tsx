import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { InvertedPendulumEngineeringData as InvertedPendulumEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: InvertedPendulumEngineeringDataType
}

export const InvertedPendulumEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.absolute-displacement.name'>
				{engineeringData?.absoluteDisplacement}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.relative-displacement.name'>
				{engineeringData?.relativeDisplacement}
			</Field>
		</StyledGridContainer>
	)
}
