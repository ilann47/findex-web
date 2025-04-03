import { RangeVariantFilterProps } from '..'
import DateTimePicker from '@/components/ui/inputs/date-time'
import { RangeValue, useFiltering } from '@/hooks/filter/filtering'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { DateObjectToDateString, DateStringToDateObject, formatDateToSingleValue } from '@/utils/date'

const DateFilter = ({ filter, startValue, endValue }: RangeVariantFilterProps) => {
	const formatMessage = useFormatMessage()
	const { applyFilter, getIsSingleValue, cleanFilter, getRangeId } = useFiltering()

	const { id } = filter
	const isSingleValue = getIsSingleValue(id)
	const { start, end } = getRangeId(id)

	const applyDateFilter = (value: RangeValue) => {
		applyFilter({ id: id, value, type: 'range' })
	}

	const handleDateChange = (date: { start?: Date | null; end?: Date | null }) => {
		if (isSingleValue) {
			if (date.start) {
				applyDateFilter(formatDateToSingleValue(date.start))
			}
		} else {
			if (date.end) {
				applyDateFilter({ end: DateObjectToDateString(date.end) })
			}
			if (date.start) {
				applyDateFilter({ start: DateObjectToDateString(date.start) })
			}
		}
	}

	return (
		<>
			<DateTimePicker
				label={isSingleValue ? formatMessage('date') : formatMessage('table.filtering.initial-date')}
				value={DateStringToDateObject(startValue)}
				onChange={(date) => handleDateChange({ start: date })}
				slotProps={{
					field: { clearable: true, onClear: () => cleanFilter(start) },
				}}
			/>
			<DateTimePicker
				label={formatMessage('table.filtering.final-date')}
				sx={isSingleValue ? { display: 'none' } : undefined}
				value={DateStringToDateObject(endValue)}
				onChange={(date) => handleDateChange({ end: date })}
				slotProps={{
					field: { clearable: true, onClear: () => cleanFilter(end) },
				}}
			/>
		</>
	)
}
export default DateFilter
