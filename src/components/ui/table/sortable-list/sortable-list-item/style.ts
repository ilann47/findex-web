import { CSS, Transform } from '@dnd-kit/utilities'
import { ListItem, styled } from '@mui/material'

import { transientOptions } from '@/utils/transient-options'

interface StyledSortableListItemProps {
	$isColumnVisible: boolean
	transform: Transform | null
	transition: string | undefined
}

export const StyledSortableListItem = styled(
	ListItem,
	transientOptions
)<StyledSortableListItemProps>(({ $isColumnVisible, transform, transition }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	transform: CSS.Transform.toString(transform),
	opacity: $isColumnVisible ? 1 : 0.5,
	transition,
}))
