import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { ElectricJointMeterEngineeringData as ElectricJointMeterEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: ElectricJointMeterEngineeringDataType
}

export const ElectricJointMeterEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.displacement.name'>
				{engineeringData?.displacement}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.meters-ratio.name'>
				{engineeringData?.metersRatio}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.meters-sum.name'>
				{engineeringData?.metersSum}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.temperature.name'>
				{engineeringData?.temperature}
			</Field>
		</StyledGridContainer>
	)
}
