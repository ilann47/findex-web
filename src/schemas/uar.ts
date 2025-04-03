/* eslint-disable prettier/prettier */
import { alarmTypeApiSchema } from './alarm/type'
import { locationFormSchema, locationSchema } from './location'
import z from './zod'

export const uarFormSchema = z.object({
	name: z.string().min(1),
	lndbRef: z.string().min(1),
	location: locationFormSchema.nullable(),
})

export type UarForm = z.infer<typeof uarFormSchema>

export const uarSchema = uarFormSchema.extend({
	id: z.number(),
	enabled: z.boolean(),
	alarms: z.array(alarmTypeApiSchema).optional(),
	location: locationSchema.nullable(),
})

export type Uar = z.infer<typeof uarSchema>

export const uartoUarFormParser = uarSchema.transform((uar) => ({
	name: uar.name,
	lndbRef: uar.lndbRef,
	location: uar.location
		? locationFormSchema.parse({
			...uar.location,
			blockId: uar.location.block?.id ?? null,
			galleryId: uar.location.gallery?.id ?? null,
		})
		: null,
}))
