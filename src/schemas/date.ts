import z from './zod'
import { DateObjectToDateString, DateStringToDateObject } from '@/utils/date'

export const dateSchema = z
	.date()
	.or(z.string())
	.transform((date) => (typeof date == 'string' ? date : DateObjectToDateString(date)))

export const dateFormSchema = z
	.date()
	.or(z.string())
	.transform((date) => (typeof date == 'string' ? DateStringToDateObject(date) : (date as unknown as string)))
