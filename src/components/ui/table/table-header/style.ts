import { CSS, Transform } from '@dnd-kit/utilities'
import { TableCell, TableCellProps, styled } from '@mui/material'

import { transientOptions } from '@/utils/transient-options'

interface DraggableTableCellProps extends TableCellProps {
	$isDragging: boolean
	transform: Transform | null
	transition?: string
}

export const DraggableTableCell = styled(
	TableCell,
	transientOptions
)<DraggableTableCellProps>(({ $isDragging, transition, transform, theme }) => ({
	...($isDragging && {
		backgroundColor: theme.palette.juicy.neutral[40],
		position: 'relative',
		zIndex: 1,
	}),

	transform: CSS.Translate.toString(transform),
	transition,
}))
