import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { ConcreteTensometerEngineeringData as ConcreteTensometerEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: ConcreteTensometerEngineeringDataType
}

export const ConcreteTensometerEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.meters-ratio.name'>
				{engineeringData?.metersRatio}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.meters-sum.name'>
				{engineeringData?.metersSum}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.temperature.name'>
				{engineeringData?.temperature}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.tension.name'>
				{engineeringData?.tension}
			</Field>
		</StyledGridContainer>
	)
}
