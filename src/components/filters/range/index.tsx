import { FormGroup, Stack } from '@mui/material'

import DateFilter from './date'
import NumberFilter from './number'
import SelectSingleValue from './single-value'
import { useFiltering } from '@/hooks/filter/filtering'
import { RangeFilter as RangeFilterType } from '@/types/filter-type'
export interface RangeVariantFilterProps {
	filter: RangeFilterType
	startValue: string
	endValue: string
}

interface RangeFilterProps {
	filter: RangeFilterType
}

const RangeFilter = ({ filter }: RangeFilterProps) => {
	const { filters, getRangeId } = useFiltering()

	const { id, variant } = filter
	const start = filters[getRangeId(id).start]
	const end = filters[getRangeId(id).end]

	return (
		<Stack marginTop={1}>
			<FormGroup sx={{ display: 'flex', gap: 1 }}>
				{variant === 'date' ? (
					<DateFilter filter={filter} startValue={start} endValue={end} />
				) : (
					<NumberFilter filter={filter} startValue={start} endValue={end} />
				)}
				<SelectSingleValue filter={filter} />
			</FormGroup>
		</Stack>
	)
}

export default RangeFilter
