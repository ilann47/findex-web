import { Divider } from '@mui/material'

import { Button } from '@/components/ui/inputs/button'
import { useFiltering } from '@/hooks/filter/filtering'

export const CleanFiltersButton = () => {
	const { clearAll, hasFilters } = useFiltering()

	if (!hasFilters) return null

	return (
		<>
			<Divider orientation='vertical' sx={{ marginX: 1 }} />
			<Button size='small' variant='text' onClick={() => clearAll()} label='table.filtering.clean-filters' />
		</>
	)
}

export default CleanFiltersButton
