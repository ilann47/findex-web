import { useCallback, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Accordion, AccordionDetails, Stack } from '@mui/material'
import { useAtom } from 'jotai'
import { FormProvider, useForm } from 'react-hook-form'

import { AccordionSummary } from '@/components/ui/accordion/summary'
import { Button } from '@/components/ui/inputs/button'
import ControlledDateTimePicker from '@/components/ui/inputs/date-time/controlled'
import ControlledTimePicker from '@/components/ui/inputs/date-time/time-picker/controlled'
import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { Text } from '@/components/ui/text'
import { AGGREGATION_PERIOD, AGGREGATION_TYPE, WEEK_DAYS } from '@/constants/date'
import { openPanel } from '@/contexts/atoms/analysis'
import { useAnalysisPeriodicity } from '@/hooks/analysis/periodicity'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import {
	AggregatePeriod,
	AggregateType,
	Periodicity as PeriodicityType,
	periodicitySchema,
} from '@/schemas/periodicity'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

export const PeriodicityPanel = () => {
	const formatMessage = useFormatMessage()
	const { updateValues, defaultValues, onChangeAggregatePeriod, onChangeAggregateType } = useAnalysisPeriodicity()

	const [panel, setPanel] = useAtom(openPanel)

	const form = useForm({
		defaultValues,
		resolver: zodResolver(periodicitySchema),
	})

	const { handleSubmit, control, watch, setValue } = form

	const onSubmit = useCallback(async (values: PeriodicityType) => {
		updateValues(values)
	}, [])

	const [aggregatePeriod, aggregateType] = watch(['aggregatePeriod', 'aggregateType'])

	useEffect(() => {
		updateValues(form.getValues())
	}, [])

	return (
		<Accordion
			expanded={panel === 'periodicity'}
			onChange={() => setPanel((curr) => (curr == 'periodicity' ? null : 'periodicity'))}
		>
			<AccordionSummary>
				<Text message='analysis.periodicity' variant='h2' />
			</AccordionSummary>
			<AccordionDetails>
				<FormProvider {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack gap={3}>
							<ControlledDateTimePicker
								control={control}
								name='startDate'
								label={formatMessage('start-date')}
								clearable
							/>

							<ControlledDateTimePicker
								control={control}
								name='endDate'
								label={formatMessage('end-date')}
								clearable
							/>

							<ControlledSelect
								control={control}
								name='aggregateType'
								label={formatMessage('analysis.aggregation.type')}
								items={AGGREGATION_TYPE.map((type) => ({
									label: formatMessage(
										`analysis.aggregation.types.${snakeToKebabCase(type)}` as Message
									),
									value: type,
								}))}
								onChange={(event) => {
									onChangeAggregateType(event.target.value as AggregateType, setValue)
								}}
								onClear={() => onChangeAggregateType(null, setValue)}
							/>

							{!!aggregateType && (
								<ControlledSelect
									control={control}
									name='aggregatePeriod'
									label={formatMessage('analysis.aggregation.period')}
									items={AGGREGATION_PERIOD.map((period) => ({
										label: formatMessage(
											`analysis.aggregation.periods.${snakeToKebabCase(period)}` as Message
										),
										value: period,
									}))}
									onChange={(event) => {
										onChangeAggregatePeriod(
											event.target.value as AggregatePeriod,
											setValue,
											aggregateType
										)
									}}
								/>
							)}

							{aggregateType == 'EXEMPLAR' && aggregatePeriod && (
								<>
									{aggregatePeriod !== 'YEAR' && (
										<ControlledTimePicker
											control={control}
											name='time'
											label={formatMessage('hour')}
											clearable
										/>
									)}

									{aggregatePeriod == 'WEEK' && (
										<ControlledSelect
											control={control}
											name='weekDay'
											label={formatMessage('analysis.aggregation.day')}
											items={WEEK_DAYS.map((day) => ({
												label: formatMessage(`weekdays.${snakeToKebabCase(day)}` as Message),
												value: day,
											}))}
										/>
									)}

									{aggregatePeriod == 'MONTH' && (
										<ControlledTextField
											control={control}
											name='day'
											label={formatMessage('analysis.aggregation.day')}
											type='number'
											InputProps={{ inputProps: { min: 1, max: 31 } }}
											fullWidth
										/>
									)}

									{aggregatePeriod == 'YEAR' && (
										<ControlledDateTimePicker
											control={control}
											name='monthDayTime'
											label={formatMessage('analysis.aggregation.month-day-time')}
											views={['month', 'day', 'hours', 'minutes', 'seconds']}
											format=''
											openTo='month'
											sx={{ width: '100%' }}
											clearable
										/>
									)}
								</>
							)}

							<Button label='analysis.update-values' variant='contained' type='submit' />
						</Stack>
					</form>
				</FormProvider>
			</AccordionDetails>
		</Accordion>
	)
}
