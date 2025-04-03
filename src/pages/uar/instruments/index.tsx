import { InstrumentsTable } from '@/components/instrument/table'
import { StyledContainer } from '@/components/ui/container'
import TableSkeleton from '@/components/ui/table/loading/skeleton'
import { Uar } from '@/schemas/uar'

interface Props {
	uar?: Uar
	isLoading?: boolean
}

const InstrumentsSection = ({ uar, isLoading }: Props) => {
	if (isLoading || !uar) return <TableSkeleton />

	return (
		<StyledContainer>
			<InstrumentsTable uar={uar} />
		</StyledContainer>
	)
}

export default InstrumentsSection
