import { useMemo } from 'react'

import { ArrowDown, ArrowUp, ArrowsVertical, ViewOff } from '@carbon/icons-react'
import { Divider, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Column } from '@tanstack/react-table'

import { IconButton } from '@/components/ui/inputs/icon-button'
import Popover, { openPopover, usePopover } from '@/components/ui/popover'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ASC, DESC, useSorting } from '@/hooks/sorting'
import { theme } from '@/theme'

export interface HeaderButtonProps<T> {
	column: Column<T, unknown>
}

const SortingButton = <T extends object>({ column }: HeaderButtonProps<T>) => {
	const formatMessage = useFormatMessage()
	const sortingPopover = usePopover()
	const { changeSorting, getIsSortedBy, sortingType } = useSorting()

	const isSortedByThisColumn = useMemo(() => getIsSortedBy(column.id), [getIsSortedBy, column])

	return (
		<>
			<IconButton
				size='small'
				onClick={(e) => openPopover(sortingPopover)(e.currentTarget)}
				tooltip='table.sorting.sort'
			>
				{isSortedByThisColumn && (
					<>
						{sortingType == 'ASC' && <ArrowDown color={theme.palette.juicy.primary[60]} />}
						{sortingType == 'DESC' && <ArrowUp color={theme.palette.juicy.primary[60]} />}
					</>
				)}

				{!isSortedByThisColumn && <ArrowsVertical />}
			</IconButton>
			<Popover ref={sortingPopover} title='table.sorting.title'>
				{
					<ToggleButtonGroup
						orientation='vertical'
						value={isSortedByThisColumn && sortingType}
						onChange={(_, value) => {
							changeSorting(column.id, value)
						}}
						exclusive
					>
						<ToggleButton value={ASC}>
							<ArrowDown />
							{formatMessage('table.sorting.ascending')}
						</ToggleButton>
						<ToggleButton value={DESC}>
							<ArrowUp />
							{formatMessage('table.sorting.descending')}
						</ToggleButton>
					</ToggleButtonGroup>
				}
				{column.getCanHide() && (
					<>
						<Divider sx={{ my: 1 }} />
						<ToggleButton value='off' onClick={column.getToggleVisibilityHandler()}>
							<ViewOff />
							{formatMessage('table.visibility.hide-column')}
						</ToggleButton>
					</>
				)}
			</Popover>
		</>
	)
}

export default SortingButton
