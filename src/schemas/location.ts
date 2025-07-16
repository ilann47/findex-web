import { z } from 'zod'

export const locationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
  description: z.string().optional(),
  elevation: z.number().optional(),
  axle: z.string().optional(),
  blockId: z.string().optional(),
  galleryId: z.string().optional(),
  block: z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    stretch: z.object({
      id: z.string().optional(),
      name: z.string(),
      acronym: z.string(),
    }).optional(),
  }).optional(),
  gallery: z.object({
    id: z.string().optional(),
    name: z.string(),
  }).optional(),
})

export type Location = z.infer<typeof locationSchema>

export const blockSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
})

export type Block = z.infer<typeof blockSchema>

export const withLocationFormSchema = z.object({
  location: locationSchema,
  block: blockSchema.optional(),
})

export type WithLocationForm = z.infer<typeof withLocationFormSchema>
