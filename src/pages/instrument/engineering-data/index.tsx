import { EngineeringDataTable } from '@/components/engineering-data/table'
import { StyledContainer } from '@/components/ui/container'
import TableSkeleton from '@/components/ui/table/loading/skeleton'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument?: Instrument
	isLoading?: boolean
}

const EngineeringDataSection = ({ instrument, isLoading }: Props) => {
	if (isLoading || !instrument) return <TableSkeleton />

	return (
		<StyledContainer>
			<EngineeringDataTable instrument={instrument} />
		</StyledContainer>
	)
}

export default EngineeringDataSection
