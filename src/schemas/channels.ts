import { instrumentSchema } from './instrument'
import z from './zod'

export const channelSchema = z.object({
	id: z.number(),
	lndbRef: z.string().min(1),
	readingVariable: z.string().min(1),
})

export type Channel = z.output<typeof channelSchema>

export const channelFormSchema = channelSchema.extend({
	id: z.number().optional(),
})

export type ChannelForm = z.output<typeof channelFormSchema>

export const channelWithInstrumentSchema = channelSchema.extend({
	instrument: z.lazy(() => instrumentSchema),
})
