/* eslint-disable indent */
import { useCallback, useMemo } from 'react'

import { format } from 'date-fns'
import { UseFormSetValue } from 'react-hook-form'

import { useSearchParams } from '../search-params'
import { AggregatePeriod, AggregateType, Periodicity, WeekDay } from '@/schemas/periodicity'

const START_DATE = 'start-date'
const END_DATE = 'end-date'
const AGGREGATION_PERIOD = 'aggregation-period'
const AGGREGATION_TYPE = 'aggregation-type'
const TIME = 'time'
const WEEK_DAY = 'week-day'
const DAY = 'day'
const MONTH_DAY_TIME = 'month-day-time'
const DEFAULT_END_DATE = new Date()
const DEFAULT_START_DATE = new Date(new Date().setDate(new Date().getDate() - 7))
DEFAULT_START_DATE.setHours(0, 0, 0, 0)
const DEFAULT_AGGREGATE_PERIOD = 'DAY'
const DEFAULT_AGGREGATE_TYPE = 'EXEMPLAR'
const DEFAULT_TIME = new Date(new Date().setHours(12, 0, 0, 0))
const DEFAULT_WEEK_DAY = 'MONDAY'
const DEFAULT_DAY = 1
const DEFAULT_MONTH_DAY_TIME = new Date(2024, 0, 1, 12, 0, 0)

export const useAnalysisPeriodicity = () => {
	const { searchParams, setParam } = useSearchParams()

	const startDate = useMemo(() => {
		const date = searchParams.get(START_DATE)
		return date ? new Date(date) : null
	}, [searchParams])

	const endDate = useMemo(() => {
		const date = searchParams.get(END_DATE)
		return date ? new Date(date) : null
	}, [searchParams])

	const aggregateType = useMemo(() => searchParams.get(AGGREGATION_TYPE) as AggregateType | null, [searchParams])

	const aggregatePeriod = useMemo(
		() => searchParams.get(AGGREGATION_PERIOD) as AggregatePeriod | null,
		[searchParams]
	)

	const time = useMemo(() => {
		const date = searchParams.get(TIME)
		return date ? new Date(date) : null
	}, [searchParams])

	const weekDay = useMemo(() => searchParams.get(WEEK_DAY) as WeekDay | null, [searchParams])

	const day = useMemo(() => searchParams.get(DAY) as number | null, [searchParams])

	const monthDayTime = useMemo(() => {
		const date = searchParams.get(MONTH_DAY_TIME)
		return date ? new Date(date) : null
	}, [searchParams])

	const defaultValues: Periodicity = useMemo(
		() => ({
			startDate: startDate ?? DEFAULT_START_DATE,
			endDate: endDate ?? DEFAULT_END_DATE,
			aggregateType: aggregateType ?? DEFAULT_AGGREGATE_TYPE,
			aggregatePeriod: aggregatePeriod ?? DEFAULT_AGGREGATE_PERIOD,
			time: time ?? DEFAULT_TIME,
			weekDay: weekDay ?? '',
			day: day ?? '',
			monthDayTime,
		}),
		[searchParams]
	)

	const onChangeAggregatePeriod = useCallback(
		(
			aggregatePeriod: AggregatePeriod,
			setValue: UseFormSetValue<Periodicity>,
			currAggregateType?: AggregateType
		) => {
			if (currAggregateType == 'EXEMPLAR') {
				switch (aggregatePeriod) {
					case 'DAY': {
						setValue('time', DEFAULT_TIME)
						setValue('weekDay', '')
						setValue('day', '')
						setValue('monthDayTime', null)
						break
					}

					case 'WEEK': {
						setValue('time', DEFAULT_TIME)
						setValue('weekDay', DEFAULT_WEEK_DAY)
						setValue('day', '')
						setValue('monthDayTime', null)
						break
					}

					case 'MONTH': {
						setValue('time', DEFAULT_TIME)
						setValue('weekDay', '')
						setValue('day', DEFAULT_DAY)
						setValue('monthDayTime', null)
						break
					}

					case 'YEAR': {
						setValue('time', null)
						setValue('weekDay', '')
						setValue('day', '')
						setValue('monthDayTime', DEFAULT_MONTH_DAY_TIME)
						break
					}
				}
			}
		},
		[]
	)

	const onChangeAggregateType = useCallback(
		(aggregateType: AggregateType | null, setValue: UseFormSetValue<Periodicity>) => {
			const resetDateTimeValues = () => {
				setValue('time', null)
				setValue('weekDay', '')
				setValue('day', '')
				setValue('monthDayTime', null)
			}

			if (aggregateType) {
				setValue('aggregatePeriod', 'DAY')

				if (aggregateType === 'EXEMPLAR') {
					onChangeAggregatePeriod('DAY', setValue, aggregateType)
				} else {
					resetDateTimeValues()
				}
			} else {
				resetDateTimeValues()
				setValue('aggregatePeriod', null)
			}
		},
		[onChangeAggregatePeriod, aggregateType]
	)

	const reference = useMemo(() => {
		const formattedTime = time ? format(time, 'HH:mm:ss') : null

		switch (aggregatePeriod) {
			case 'DAY': {
				return formattedTime
			}

			case 'WEEK': {
				return time ? [weekDay, formattedTime].join(',') : null
			}

			case 'MONTH': {
				return time && day ? [String(day).padStart(2, '0'), formattedTime].join(',') : null
			}

			case 'YEAR': {
				return monthDayTime ? format(monthDayTime, 'dd/MM,HH:mm:ss') : null
			}
		}
	}, [aggregatePeriod, time, weekDay, day, monthDayTime])

	const updateValues = useCallback(
		({ startDate, endDate, aggregatePeriod, time, weekDay, day, monthDayTime, aggregateType }: Periodicity) => {
			setParam(START_DATE, startDate)
			setParam(END_DATE, endDate)
			setParam(AGGREGATION_TYPE, aggregateType)
			setParam(AGGREGATION_PERIOD, aggregatePeriod == '' ? null : aggregatePeriod)
			setParam(TIME, time)
			setParam(WEEK_DAY, weekDay == '' ? null : weekDay)
			setParam(DAY, day == '' ? null : day)
			setParam(MONTH_DAY_TIME, monthDayTime)
		},
		[]
	)

	return {
		startDate,
		endDate,
		aggregateType,
		aggregatePeriod,
		defaultValues,
		reference,
		updateValues,
		onChangeAggregatePeriod,
		onChangeAggregateType,
	}
}
