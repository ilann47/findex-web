import z from './zod'

export const addInstrumentsFormSchema = z.object({
	instrumentsIds: z.array(z.number()),
})

export type AddInstrumentsForm = z.infer<typeof addInstrumentsFormSchema>
