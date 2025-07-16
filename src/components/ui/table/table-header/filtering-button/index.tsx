import { Filter as FilterIcon } from '@carbon/icons-react'
import { Stack } from '@mui/material'

import FilterContent from './filter-content'
import { Button } from '@/components/ui/inputs/button'
import { IconButton } from '@/components/ui/inputs/icon-button'
import Popover, { openPopover, usePopover } from '@/components/ui/popover'
import { useFiltering } from '@/hooks/filter/filtering'
import { theme } from '@/theme'
import { Filter } from '@/types/filter-type'

export interface FilteringButtonProps {
	filter: Filter
}

const FilteringButton = ({ filter }: FilteringButtonProps) => {
	const filteringPopover = usePopover()
	const { cleanFilter, getIsFilteredBy } = useFiltering()

	const handleCleanFilters = () => {
		filter && cleanFilter(filter.id, filter.type === 'range')
	}

	return (
		<>
			<IconButton
				size='small'
				onClick={(e) => openPopover(filteringPopover)(e.currentTarget)}
				tooltip='table.filtering.filter'
			>
				<FilterIcon color={getIsFilteredBy(filter.id) ? theme.palette.juicy.primary[60] : undefined} />
			</IconButton>

			<Popover ref={filteringPopover} title='table.filtering.filters'>
				<FilterContent filter={filter} />
				<Stack direction='row' gap={1} marginTop={theme.spacing(2)}>
					<Button variant='text' fullWidth onClick={handleCleanFilters} label='table.filtering.clean' />
				</Stack>
			</Popover>
		</>
	)
}

export default FilteringButton
