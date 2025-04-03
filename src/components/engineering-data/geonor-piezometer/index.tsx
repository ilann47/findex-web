import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { GeonorPiezometerEngineeringData as GeonorPiezometerEngineeringDataType } from '@/schemas/engineering-data'

interface Props {
	engineeringData?: GeonorPiezometerEngineeringDataType
}

export const GeonorPiezometerEngineeringData = ({ engineeringData }: Props) => {
	return (
		<StyledGridContainer>
			<Field component='grid' labelId='instrument.engineering-value.relative-pressure.name'>
				{engineeringData?.relativePressure}
			</Field>
			<Field component='grid' labelId='instrument.engineering-value.water-level.name'>
				{engineeringData?.waterLevel}
			</Field>
		</StyledGridContainer>
	)
}
