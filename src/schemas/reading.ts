import { dateSchema } from './date'
import z from './zod'

export const readingSchema = z.object({
	id: z.number(),
	date: dateSchema,
})

export type Reading = z.output<typeof readingSchema>

export const barometerReadingSchema = readingSchema.extend({
	r: z.number().nullable(),
})

export const barometerReadingFormSchema = barometerReadingSchema.omit({ id: true, date: true })

export type BarometerReadingForm = z.output<typeof barometerReadingFormSchema>

export type BarometerReading = z.output<typeof barometerReadingSchema>

export const strainMeterReadingSchema = readingSchema.extend({
	vr: z.number().nullable(),
	vrl1: z.number().nullable(),
	vp: z.number().nullable(),
	vr5: z.number().nullable(),
})

export const strainMeterReadingFormSchema = strainMeterReadingSchema.omit({ id: true, date: true })

export type DeformimeterReadingForm = z.output<typeof strainMeterReadingFormSchema>

export type DeformimeterReading = z.output<typeof strainMeterReadingSchema>

export const extensometerReadingSchema = readingSchema.extend({
	r1: z.number().nullable(),
	t1: z.number().nullable(),
})

export const extensometerReadingFormSchema = extensometerReadingSchema.omit({ id: true, date: true })

export type ExtensometerReadingForm = z.output<typeof extensometerReadingFormSchema>

export type ExtensometerReading = z.output<typeof extensometerReadingSchema>

export const flowMeterReadingSchema = readingSchema.extend({
	r1: z.number().nullable(),
	t1: z.number().nullable(),
})

export const flowMeterReadingFormSchema = flowMeterReadingSchema.omit({ id: true, date: true })

export type FlowMeterReadingForm = z.output<typeof flowMeterReadingFormSchema>

export type FlowMeterReading = z.output<typeof flowMeterReadingSchema>

export const electricJointMeterReadingSchema = readingSchema.extend({
	vr: z.number().nullable(),
	vrl1: z.number().nullable(),
	vp: z.number().nullable(),
	vr5: z.number().nullable(),
})

export const electricJointMeterReadingFormSchema = electricJointMeterReadingSchema.omit({ id: true, date: true })

export type ElectricJointMeterReadingForm = z.output<typeof electricJointMeterReadingFormSchema>

export type ElectricJointMeterReading = z.output<typeof electricJointMeterReadingSchema>

export const directPendulumReadingSchema = readingSchema.extend({
	r: z.number().nullable(),
})

export const directPendulumReadingFormSchema = directPendulumReadingSchema.omit({ id: true, date: true })

export type DirectPendulumReadingForm = z.output<typeof directPendulumReadingFormSchema>

export type DirectPendulumReading = z.output<typeof directPendulumReadingSchema>

export const invertedPendulumReadingSchema = readingSchema.extend({
	r: z.number().nullable(),
})

export const invertedPendulumReadingFormSchema = invertedPendulumReadingSchema.omit({ id: true, date: true })

export type InvertedPendulumReadingForm = z.output<typeof invertedPendulumReadingFormSchema>

export type InvertedPendulumReading = z.output<typeof invertedPendulumReadingSchema>

export const standpipePiezometerReadingSchema = readingSchema.extend({
	r1: z.number().nullable(),
	t1: z.number().nullable(),
})

export const standpipePiezometerReadingFormSchema = standpipePiezometerReadingSchema.omit({ id: true, date: true })

export type StandpipePiezometerReadingForm = z.output<typeof standpipePiezometerReadingFormSchema>

export type StandpipePiezometerReading = z.output<typeof standpipePiezometerReadingSchema>

export const geonorPiezometerReadingSchema = readingSchema.extend({
	r1: z.number().nullable(),
})

export const geonorPiezometerReadingFormSchema = geonorPiezometerReadingSchema.omit({ id: true, date: true })

export type GeonorPiezometerReadingForm = z.output<typeof geonorPiezometerReadingFormSchema>

export type GeonorPiezometerReading = z.output<typeof geonorPiezometerReadingSchema>

export const stressMeterReadingSchema = readingSchema.extend({
	vr: z.number().nullable(),
	vrl1: z.number().nullable(),
	vp: z.number().nullable(),
	vr5: z.number().nullable(),
})

export const stressMeterReadingFormSchema = stressMeterReadingSchema.omit({ id: true, date: true })

export type ConcreteTensometerReadingForm = z.output<typeof stressMeterReadingFormSchema>

export type ConcreteTensometerReading = z.output<typeof stressMeterReadingSchema>
