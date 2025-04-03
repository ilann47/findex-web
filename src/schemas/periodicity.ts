import z from './zod'
import { AGGREGATION_PERIOD, AGGREGATION_TYPE, WEEK_DAYS } from '@/constants/date'

export const aggregatePeriodSchema = z.enum(AGGREGATION_PERIOD)

export type AggregatePeriod = z.output<typeof aggregatePeriodSchema>

export const aggregateTypeSchema = z.enum(AGGREGATION_TYPE)

export type AggregateType = z.output<typeof aggregateTypeSchema>

export const weekDaySchema = z.enum(WEEK_DAYS)

export type WeekDay = z.output<typeof weekDaySchema>

export const periodicitySchema = z
	.object({
		startDate: z.date().nullable(),
		endDate: z.date().nullable(),
		aggregateType: aggregateTypeSchema.nullable().or(z.literal('')),
		aggregatePeriod: aggregatePeriodSchema.nullable().or(z.literal('')),
		time: z.date().nullable(),
		weekDay: weekDaySchema.nullable().or(z.literal('')),
		day: z.number().min(1).max(31).nullable().or(z.literal('')),
		monthDayTime: z.date().nullable(),
	})
	.superRefine((val, ctx) => {
		if (val.aggregateType && !val.aggregatePeriod) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['aggregatePeriod'],
			})
		}

		if (val.aggregateType !== 'EXEMPLAR') return

		if (
			(val.aggregatePeriod == 'DAY' || val.aggregatePeriod == 'WEEK' || val.aggregatePeriod == 'MONTH') &&
			!val.time
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['time'],
			})
		}

		if (val.aggregatePeriod == 'WEEK' && !val.weekDay) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['weekDay'],
			})
		}

		if (val.aggregatePeriod == 'MONTH' && !val.day) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['day'],
			})
		}

		if (val.aggregatePeriod == 'YEAR' && !val.monthDayTime) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['monthDayTime'],
			})
		}
	})

export type Periodicity = z.output<typeof periodicitySchema>
