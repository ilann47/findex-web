import { Channel, channelFormSchema } from './channels'
import { locationFormSchema, locationSchema, locationToLocationFormParser } from './location'
import { uarSchema } from './uar'
import z from './zod'
import { INSTRUMENT_TYPES } from '@/constants/instrument'

export const instrumentTypeSchema = z.enum(INSTRUMENT_TYPES)

export type InstrumentType = z.output<typeof instrumentTypeSchema>

export const geologicalProfileSchema = z.object({
	id: z.number(),
	name: z.string(),
})

export type GeologicalProfile = z.output<typeof geologicalProfileSchema>

export const instrumentSchema = z.object({
	id: z.number(),
	name: z.string().min(1),
	type: instrumentTypeSchema,
	location: locationSchema.nullable(),
	serialNumber: z.string().min(1),
	enabled: z.boolean().default(false),
	hasAlarm: z.boolean().default(false).nullable(),
	uar: uarSchema,
	construction: z.string().nullable(),
	geologicalProfile: geologicalProfileSchema.nullable(),
})

export type Instrument = z.infer<typeof instrumentSchema>

export const instrumentFormSchema = instrumentSchema
	.omit({ id: true, hasAlarm: true, uar: true, geologicalProfile: true })
	.extend({
		location: locationFormSchema.nullable(),
		uarId: z.number(),
		geologicalProfileId: z.number().nullable(),
		channels: z.array(channelFormSchema).nullable(),
		image: z.instanceof(File).optional().nullable(),
	})

export type InstrumentForm = z.infer<typeof instrumentFormSchema>

export const instrumentToInstrumentFormParser = instrumentSchema.transform((instrument) => {
	return (channels?: Channel[], image?: File | null) => ({
		name: instrument.name,
		type: instrument.type,
		location: instrument.location ? locationToLocationFormParser.parse(instrument.location) : null,
		serialNumber: instrument.serialNumber,
		construction: instrument.construction,
		uarId: instrument.uar.id,
		geologicalProfileId: instrument.geologicalProfile?.id ?? null,
		channels: channels ?? null,
		image: image ?? null,
		enabled: instrument.enabled,
	})
})
