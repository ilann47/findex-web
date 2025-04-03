import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { FlowMeterEngineeringData as FlowMeterEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: FlowMeterEngineeringDataType
}

export const FlowMeterEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.water-flow.name'>
				{engineeringData?.waterFlow}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.water-level.name'>
				{engineeringData?.waterLevel}
			</Field>
		</StyledGridContainer>
	)
}
