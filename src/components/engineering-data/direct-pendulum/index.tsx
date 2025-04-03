import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { DirectPendulumEngineeringData as DirectPendulumEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: DirectPendulumEngineeringDataType
}

export const DirectPendulumEngineeringData = ({ engineeringData }: Props) => {
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
