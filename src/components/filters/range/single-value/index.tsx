import { FC } from 'react'

import Checkbox from '@/components/ui/inputs/checkbox'
import { useFiltering } from '@/hooks/filter/filtering'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { RangeFilter } from '@/types/filter-type'

interface SelectSingleValueProps {
	filter: RangeFilter
}

const SelectSingleValue: FC<SelectSingleValueProps> = ({ filter }) => {
	const { setSingleValue, getIsSingleValue } = useFiltering()
	const formatMessage = useFormatMessage()

	const { id } = filter
	const isSingleValue = getIsSingleValue(id)

	const handleSingleValueChange = () => {
		setSingleValue(id)
	}

	return (
		<>
			<Checkbox
				label={formatMessage('table.filtering.single-value')}
				checked={!!isSingleValue}
				onChange={handleSingleValueChange}
			/>
		</>
	)
}

export default SelectSingleValue
