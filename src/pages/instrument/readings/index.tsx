import { ReadingsTable } from '@/components/reading/table'
import { StyledContainer } from '@/components/ui/container'
import TableSkeleton from '@/components/ui/table/loading/skeleton'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument?: Instrument
	isLoading?: boolean
}

const ReadingsSection = ({ instrument, isLoading = false }: Props) => {
	if (isLoading || !instrument) return <TableSkeleton />

	return (
		<StyledContainer>
			<ReadingsTable instrument={instrument} />
		</StyledContainer>
	)
}

export default ReadingsSection
