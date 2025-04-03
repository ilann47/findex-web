import { FilteringButtonProps } from '..'
import RangeFilter from '@/components/filters/range'
import SelectFilter from '@/components/filters/select'
import TextFilter from '@/components/filters/text'

const FilterContent = ({ filter }: FilteringButtonProps) => {
	if (!filter) return null
	const { type } = filter

	if (type == 'select') return <SelectFilter filter={filter} />

	if (type === 'range') return <RangeFilter filter={filter} />

	if (type === 'text') return <TextFilter filter={filter} />
}

export default FilterContent
