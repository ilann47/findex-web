import { alarmTypeApiSchema } from './type'
import z from '../zod'

export const alarmColorSchema = z.object({
	id: z.number(),
	alarmType: alarmTypeApiSchema.nullable(),
	color: z.string(),
})

export type AlarmColor = z.output<typeof alarmColorSchema>
