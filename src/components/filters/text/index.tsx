import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'

import { Stack } from '@mui/material'
import debounce from 'lodash.debounce'

import SearchTextField from '@/components/ui/inputs/text-field/search'
import { useFiltering } from '@/hooks/filter/filtering'
import { TextFilter as TextFilterType } from '@/types/filter-type'

interface TextFilterProps {
	filter: TextFilterType
}

const TextFilter = ({ filter }: TextFilterProps) => {
	const { applyFilter, filters } = useFiltering()
	const { id } = filter
	const [inputValue, setInputValue] = useState(filters[id] || '')
	const inputRef = useRef<HTMLDivElement>()

	useEffect(() => {
		setInputValue(filters[id] || '')
	}, [filters, id])

	const debouncedSearch = useRef(
		debounce((value: string) => {
			applyFilter({ id: id, value: value, type: 'text' })
		}, 300)
	).current

	useEffect(() => {
		return () => {
			debouncedSearch.cancel()
		}
	}, [debouncedSearch])

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus()
	})

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setInputValue(value)
		debouncedSearch(value)
	}

	return (
		<Stack marginTop={1}>
			<SearchTextField
				inputRef={inputRef}
				placeholder='table.filtering.search-option'
				onChange={handleInputChange}
				value={inputValue}
			/>
		</Stack>
	)
}

export default forwardRef(TextFilter)
