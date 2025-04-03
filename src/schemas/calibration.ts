import { dateFormSchema, dateSchema } from './date'
import {
	barometerReadingFormSchema,
	barometerReadingSchema,
	directPendulumReadingFormSchema,
	directPendulumReadingSchema,
	electricJointMeterReadingFormSchema,
	electricJointMeterReadingSchema,
	extensometerReadingFormSchema,
	extensometerReadingSchema,
	flowMeterReadingFormSchema,
	flowMeterReadingSchema,
	geonorPiezometerReadingFormSchema,
	geonorPiezometerReadingSchema,
	invertedPendulumReadingFormSchema,
	invertedPendulumReadingSchema,
	standpipePiezometerReadingFormSchema,
	standpipePiezometerReadingSchema,
	strainMeterReadingFormSchema,
	strainMeterReadingSchema,
	stressMeterReadingFormSchema,
	stressMeterReadingSchema,
} from './reading'
import z from './zod'

export const calibrationFormSchema = z.object({
	startDate: dateFormSchema,
	endDate: dateFormSchema.nullable(),
	calibrationSheet: z.instanceof(File).optional().nullable(),

	instrumentId: z.number().optional().nullable(),
})

export type CalibrationForm = z.infer<typeof calibrationFormSchema>

export const calibrationSchema = calibrationFormSchema.omit({ instrumentId: true, calibrationSheet: true }).extend({
	id: z.number(),
	createdDate: dateSchema,
	startDate: dateSchema,
	endDate: dateSchema.nullable(),
})

export type Calibration = z.infer<typeof calibrationSchema>

export const barometerCalibrationFormSchema = calibrationFormSchema.extend({
	m: z.number(),
	c: z.number(),
	prioriReading: barometerReadingFormSchema.nullable(),
	posterioriReading: barometerReadingFormSchema.nullable(),
})

export const barometerCalibrationSchema = z.object({
	...barometerCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: barometerReadingSchema.nullable(),
	posterioriReading: barometerReadingSchema.nullable(),
})

export type BarometerCalibrationForm = z.infer<typeof barometerCalibrationFormSchema>

export type BarometerCalibration = z.infer<typeof barometerCalibrationSchema>

export const strainMeterCalibrationFormSchema = calibrationFormSchema.extend({
	r1r20: z.number(),
	r1r2r0: z.number(),
	vecc: z.number(),
	vdrl: z.number(),
	r5: z.number(),
	r0: z.number(),
	beta: z.number(),
	f: z.number(),
	b: z.number(),
	prioriReading: strainMeterReadingFormSchema.nullable(),
	posterioriReading: strainMeterReadingFormSchema.nullable(),
})

export const strainMeterCalibrationSchema = z.object({
	...strainMeterCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: strainMeterReadingSchema.nullable(),
	posterioriReading: strainMeterReadingSchema.nullable(),
})

export type DeformimeterCalibrationForm = z.infer<typeof strainMeterCalibrationFormSchema>

export type DeformimeterCalibration = z.infer<typeof strainMeterCalibrationSchema>

export const extensometerCalibrationFormSchema = calibrationFormSchema.extend({
	a: z.number(),
	b: z.number(),
	c: z.number(),
	g: z.number(),
	r0: z.number(),
	t0: z.number(),
	m: z.number(),
	bk: z.number(),
	l: z.number(),
	prioriReading: extensometerReadingFormSchema.nullable(),
	posterioriReading: extensometerReadingFormSchema.nullable(),
})

export const extensometerCalibrationSchema = z.object({
	...extensometerCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: extensometerReadingSchema.nullable(),
	posterioriReading: extensometerReadingSchema.nullable(),
})

export type ExtensometerCalibrationForm = z.infer<typeof extensometerCalibrationFormSchema>

export type ExtensometerCalibration = z.infer<typeof extensometerCalibrationSchema>

export const flowMeterCalibrationFormSchema = calibrationFormSchema.extend({
	a: z.number(),
	b: z.number(),
	c: z.number(),
	k: z.number(),
	f: z.number(),
	h0: z.number(),
	r0: z.number(),
	t0: z.number(),
	l: z.number().nullable(),
	prioriReading: flowMeterReadingFormSchema.nullable(),
	posterioriReading: flowMeterReadingFormSchema.nullable(),
})

export const flowMeterCalibrationSchema = z.object({
	...flowMeterCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: flowMeterReadingSchema.nullable(),
	posterioriReading: flowMeterReadingSchema.nullable(),
})

export type FlowMeterCalibrationForm = z.infer<typeof flowMeterCalibrationFormSchema>

export type FlowMeterCalibration = z.infer<typeof flowMeterCalibrationSchema>

export const electricJointMeterCalibrationFormSchema = calibrationFormSchema.extend({
	f: z.number(),
	r1r2r0: z.number(),
	vecc: z.number(),
	vdrl: z.number(),
	r5: z.number(),
	r0: z.number(),
	beta: z.number(),
	prioriReading: electricJointMeterReadingFormSchema.nullable(),
	posterioriReading: electricJointMeterReadingFormSchema.nullable(),
})

export const electricJointMeterCalibrationSchema = z.object({
	...electricJointMeterCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: electricJointMeterReadingSchema.nullable(),
	posterioriReading: electricJointMeterReadingSchema.nullable(),
})

export type ElectricJointMeterCalibrationForm = z.infer<typeof electricJointMeterCalibrationFormSchema>

export type ElectricJointMeterCalibration = z.infer<typeof electricJointMeterCalibrationSchema>

export const directPendulumCalibrationFormSchema = calibrationFormSchema.extend({
	x1: z.number(),
	x2: z.number(),
	y1: z.number(),
	y2: z.number(),
	k: z.number(),
	l: z.number(),
	prioriReading: directPendulumReadingFormSchema.nullable(),
	posterioriReading: directPendulumReadingFormSchema.nullable(),
})

export const directPendulumCalibrationSchema = z.object({
	...directPendulumCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: directPendulumReadingSchema.nullable(),
	posterioriReading: directPendulumReadingSchema.nullable(),
})

export type DirectPendulumCalibrationForm = z.infer<typeof directPendulumCalibrationFormSchema>

export type DirectPendulumCalibration = z.infer<typeof directPendulumCalibrationSchema>

export const invertedPendulumCalibrationFormSchema = calibrationFormSchema.extend({
	x1: z.number(),
	x2: z.number(),
	y1: z.number(),
	y2: z.number(),
	k: z.number(),
	l: z.number(),
	prioriReading: invertedPendulumReadingFormSchema.nullable(),
	posterioriReading: invertedPendulumReadingFormSchema.nullable(),
})

export const invertedPendulumCalibrationSchema = z.object({
	...invertedPendulumCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: invertedPendulumReadingSchema.nullable(),
	posterioriReading: invertedPendulumReadingSchema.nullable(),
})

export type InvertedPendulumCalibrationForm = z.infer<typeof invertedPendulumCalibrationFormSchema>

export type InvertedPendulumCalibration = z.infer<typeof invertedPendulumCalibrationSchema>

export const standpipePiezometerCalibrationFormSchema = calibrationFormSchema.extend({
	a: z.number(),
	b: z.number(),
	c: z.number(),
	k: z.number(),
	t0: z.number(),
	s0: z.number(),
	q: z.number(),
	q2: z.number(),
	alfa: z.number(),
	qf: z.number(),
	l: z.number(),
	prioriReading: standpipePiezometerReadingFormSchema.nullable(),
	posterioriReading: standpipePiezometerReadingFormSchema.nullable(),
})

export const standpipePiezometerCalibrationSchema = z.object({
	...standpipePiezometerCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: standpipePiezometerReadingSchema.nullable(),
	posterioriReading: standpipePiezometerReadingSchema.nullable(),
})

export type StandpipePiezometerCalibrationForm = z.infer<typeof standpipePiezometerCalibrationFormSchema>

export type StandpipePiezometerCalibration = z.infer<typeof standpipePiezometerCalibrationSchema>

export const geonorPiezometerCalibrationFormSchema = calibrationFormSchema.extend({
	r0: z.number(),
	k: z.number(),
	f: z.number(),
	c: z.number(),
	prioriReading: geonorPiezometerReadingFormSchema.nullable(),
	posterioriReading: geonorPiezometerReadingFormSchema.nullable(),
})

export const geonorPiezometerCalibrationSchema = z.object({
	...geonorPiezometerCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: geonorPiezometerReadingSchema.nullable(),
	posterioriReading: geonorPiezometerReadingSchema.nullable(),
})

export type GeonorPiezometerCalibrationForm = z.infer<typeof geonorPiezometerCalibrationFormSchema>

export type GeonorPiezometerCalibration = z.infer<typeof geonorPiezometerCalibrationSchema>

export const stressMeterCalibrationFormSchema = calibrationFormSchema.extend({
	r1r20: z.number(),
	r1r2r0: z.number(),
	r0: z.number(),
	beta: z.number(),
	f: z.number(),
	vecc: z.number(),
	vdrl: z.number(),
	r5: z.number(),
	td80: z.number(),
	ex: z.number(),
	ac: z.number(),
	b: z.number(),
	prioriReading: stressMeterReadingFormSchema.nullable(),
	posterioriReading: stressMeterReadingFormSchema.nullable(),
})

export const stressMeterCalibrationSchema = z.object({
	...stressMeterCalibrationFormSchema.omit({ instrumentId: true }).shape,
	...calibrationSchema.shape,
	prioriReading: stressMeterReadingSchema.nullable(),
	posterioriReading: stressMeterReadingSchema.nullable(),
})

export type ConcreteTensometerCalibrationForm = z.infer<typeof stressMeterCalibrationFormSchema>

export type ConcreteTensometerCalibration = z.infer<typeof stressMeterCalibrationSchema>
