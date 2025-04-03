import z from './zod'

export const stretchSchema = z.object({
	id: z.number(),
	name: z.string(),
	acronym: z.string(),
})

export const blockSchema = z.object({
	id: z.number(),
	name: z.string(),
	stretch: stretchSchema.nullable().optional(),
})

export type Block = z.output<typeof blockSchema>

export const gallerySchema = z.object({
	id: z.number(),
	name: z.string(),
	stretch: stretchSchema.nullable().optional(),
})

export type Gallery = z.output<typeof gallerySchema>

export const locationSchema = z.object({
	block: blockSchema.nullable(),
	gallery: gallerySchema.nullable(),
	latitude: z.coerce.number().nullable(),
	longitude: z.coerce.number().nullable(),
	elevation: z.number().nullable(),
	description: z.string().nullable(),
	axle: z.string().nullable(),
})

export type Location = z.output<typeof locationSchema>

export const locationFormSchema = locationSchema.omit({ block: true, gallery: true }).extend({
	blockId: z.number().nullable(),
	galleryId: z.number().nullable(),
})

export type LocationForm = z.output<typeof locationFormSchema>

export const locationToLocationFormParser = locationSchema.transform((location) => ({
	...location,
	blockId: location.block?.id ?? null,
	galleryId: location.gallery?.id ?? null,
}))

export interface WithLocationForm {
	location: LocationForm
}
