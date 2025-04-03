import { AlarmsTable } from '@/components/alarm/table'
import { StyledContainer } from '@/components/ui/container'
import TableSkeleton from '@/components/ui/table/loading/skeleton'
import { Uar } from '@/schemas/uar'

interface Props {
	uar?: Uar
	isLoading?: boolean
}

const AlarmsSection = ({ uar, isLoading }: Props) => {
	if (isLoading || !uar) return <TableSkeleton />

	return (
		<StyledContainer>
			<AlarmsTable uar={uar} />
		</StyledContainer>
	)
}

export default AlarmsSection
