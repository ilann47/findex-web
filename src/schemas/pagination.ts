import z from './zod'

export const paginationSchema = z.object({
	page: z.number().min(0),
	size: z.number().min(5),
})

export type Pagination = z.output<typeof paginationSchema>
