import z from './zod'

export const pageableSchema = z.object({
	content: z.any().array().default([]),
	pageable: z.object({
		sort: z.object({
			sorted: z.boolean(),
			unsorted: z.boolean(),
			empty: z.boolean().optional(),
		}),
		offset: z.number(),
		pageNumber: z.number(),
		pageSize: z.number(),
		paged: z.boolean(),
		unpaged: z.boolean(),
	}),
	last: z.boolean(),
	totalPages: z.number(),
	totalElements: z.number(),
	size: z.number(),
	number: z.number(),
	sort: z.object({
		sorted: z.boolean(),
		unsorted: z.boolean(),
		empty: z.boolean(),
	}),
	first: z.boolean(),
	numberOfElements: z.number(),
	empty: z.boolean(),
})

export type Pageable<T extends ReturnType> = Omit<z.infer<typeof pageableSchema>, 'content'> & {
	content: T[]
}

export type ReturnType = object | string | number
