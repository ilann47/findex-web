import { alarmTypeApiSchema } from './type'
import { channelWithInstrumentSchema } from '../channels'
import { dateSchema } from '../date'
import { uarSchema } from '../uar'
import z from '../zod'

export const alarmSchema = z.object({
	id: z.number(),
	type: alarmTypeApiSchema,
	date: dateSchema,
	active: z.boolean(),
	solutionDate: dateSchema,
	uar: uarSchema,
	channel: channelWithInstrumentSchema,
})

export type Alarm = z.output<typeof alarmSchema>
