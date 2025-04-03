import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { BarometerEngineeringData as BarometerEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: BarometerEngineeringDataType
}

export const BarometerEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.pressure.name'>
				{engineeringData?.pressure}
			</Field>
		</StyledGridContainer>
	)
}
