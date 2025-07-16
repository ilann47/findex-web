import { useMemo, useState } from 'react'

import { FormGroup, Stack } from '@mui/material'

import SelectFilterItems from './items'
import Checkbox from '@/components/ui/inputs/checkbox'
import SearchTextField from '@/components/ui/inputs/text-field/search'
import { Text } from '@/components/ui/text'
import { useSelectFiltering } from '@/hooks/filter/select-filter'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { SelectFilter as SelectFilterType } from '@/types/filter-type'
import { normalize } from '@/utils/normalize'

interface ListFilterProps {
	filter: SelectFilterType
}

const SelectFilter = ({ filter }: ListFilterProps) => {
	const formatMessage = useFormatMessage()
	const { items, variant } = filter
	const { isAllChecked, isIndeterminate, handleSelectAll, selectedItems, isItemChecked, handleChangeSelect } =
		useSelectFiltering(filter)

	const [searchTerm, setSearchTerm] = useState('')

	const filteredItems = useMemo(
		() => items.filter((item) => normalize(item.label.toLowerCase()).includes(normalize(searchTerm.toLowerCase()))),
		[items, searchTerm]
	)

	return (
		<Stack sx={{ width: (theme) => theme.spacing(30) }}>
			<Text
				message={{ id: 'table.filtering.selected', values: { qtd: selectedItems.length.toString() } }}
				sx={{ marginY: 1 }}
				variant='body2'
			/>
			<SearchTextField
				placeholder='table.filtering.search-option'
				clear={() => setSearchTerm('')}
				onChange={(e) => setSearchTerm(e.target.value.toString())}
				value={searchTerm}
			/>
			<FormGroup>
				<Checkbox
					checked={isAllChecked || variant === 'single'}
					indeterminate={isIndeterminate}
					label={formatMessage('table.filtering.select-all')}
					onChange={() => handleSelectAll()}
					sx={{ marginY: 1 }}
					disabled={variant === 'single'}
				/>
				<SelectFilterItems
					items={filteredItems}
					isChecked={isItemChecked}
					handleSelect={handleChangeSelect}
					isLoading={filter.isLoading}
				/>
			</FormGroup>
		</Stack>
	)
}

export default SelectFilter
