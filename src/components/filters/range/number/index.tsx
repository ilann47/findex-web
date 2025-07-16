import { TextField } from '@mui/material'

import { RangeVariantFilterProps } from '..'
import { RangeValue, useFiltering } from '@/hooks/filter/filtering'
import { useFormatMessage } from '@/hooks/i18n/format-message'

const NumberFilter = ({ filter, startValue, endValue }: RangeVariantFilterProps) => {
	const { applyFilter, getIsSingleValue } = useFiltering()
	const formatMessage = useFormatMessage()

	const { id } = filter
	const isSingleValue = getIsSingleValue(id)

	const applyNumberFilter = (value: RangeValue) => {
		applyFilter({ id: id, value: value, type: 'range' })
	}

	const onChangeNumber = (value: RangeValue) => {
		if (isSingleValue) {
			applyNumberFilter({ start: value.start, end: value.start })
		} else {
			applyNumberFilter(value)
		}
	}

	return (
		<>
			<TextField
				type='number'
				value={startValue ?? ''}
				onChange={(e) => onChangeNumber({ start: e.target.value })}
				label={
					isSingleValue
						? formatMessage('table.filtering.value')
						: formatMessage('table.filtering.initial-value')
				}
			/>
			<TextField
				type='number'
				value={endValue ?? ''}
				onChange={(e) => onChangeNumber({ end: e.target.value })}
				label={formatMessage('table.filtering.final-value')}
				sx={isSingleValue ? { display: 'none' } : undefined}
			/>
		</>
	)
}

export default NumberFilter
