import { UsersTable } from '@/components/auth/user/table'
import { StyledContainer } from '@/components/ui/container'
import TableSkeleton from '@/components/ui/table/loading/skeleton'

interface Props {
	groupName?: string
}

export const UsersSection = ({ groupName }: Props) => {
	if (!groupName) return <TableSkeleton />

	return (
		<StyledContainer>
			<UsersTable groupName={groupName} />
		</StyledContainer>
	)
}
