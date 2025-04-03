import { AlarmsTable } from '@/components/alarm/table'
import { StyledContainer } from '@/components/ui/container'
import TableSkeleton from '@/components/ui/table/loading/skeleton'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument?: Instrument
	isLoading?: boolean
}

const AlarmsSection = ({ instrument, isLoading }: Props) => {
	if (isLoading || !instrument) return <TableSkeleton />

	return (
		<StyledContainer>
			<AlarmsTable instrument={instrument} />
		</StyledContainer>
	)
}

export default AlarmsSection
