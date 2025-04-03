import { Calibration } from './calibration'
import { Reading } from './reading'
import z from './zod'

export const engineeringDataSchema = z.object({
	id: z.number(),
	date: z.string(),
})

export type EngineeringData = z.output<typeof engineeringDataSchema>

export type EngineeringDataDetails<C extends Calibration, R extends Reading, D extends EngineeringData> = D & {
	calibration: C
	reading: R
}

export const barometerEngineeringDataSchema = engineeringDataSchema.extend({
	pressure: z.number(),
})

export type BarometerEngineeringData = z.output<typeof barometerEngineeringDataSchema>

export const strainMeterEngineeringDataSchema = engineeringDataSchema.extend({
	metersSum: z.number(),
	metersRatio: z.number(),
	temperature: z.number(),
	tension: z.number(),
})

export type DeformimeterEngineeringData = z.output<typeof strainMeterEngineeringDataSchema>

export const extensometerEngineeringDataSchema = engineeringDataSchema.extend({
	absoluteDisplacement: z.number(),
	relativeDisplacement: z.number(),
})

export type ExtensometerEngineeringData = z.output<typeof extensometerEngineeringDataSchema>

export const flowMeterEngineeringDataSchema = engineeringDataSchema.extend({
	waterLevel: z.number(),
	waterFlow: z.number(),
})

export type FlowMeterEngineeringData = z.output<typeof flowMeterEngineeringDataSchema>

export const electricJointMeterEngineeringDataSchema = engineeringDataSchema.extend({
	metersSum: z.number(),
	metersRatio: z.number(),
	temperature: z.number(),
	displacement: z.number(),
})

export type ElectricJointMeterEngineeringData = z.output<typeof electricJointMeterEngineeringDataSchema>

export const directPendulumEngineeringDataSchema = engineeringDataSchema.extend({
	absoluteDisplacement: z.number(),
	relativeDisplacement: z.number(),
})

export type DirectPendulumEngineeringData = z.output<typeof directPendulumEngineeringDataSchema>

export const invertedPendulumEngineeringDataSchema = engineeringDataSchema.extend({
	absoluteDisplacement: z.number(),
	relativeDisplacement: z.number(),
})

export type InvertedPendulumEngineeringData = z.output<typeof invertedPendulumEngineeringDataSchema>

export const standpipePiezometerSchema = engineeringDataSchema.extend({
	absolutePressure: z.number(),
	relativePressure: z.number(),
	seaLevelElevation: z.number(),
	tubeWaterLevelDistance: z.number(),
})

export type StandpipePiezometerEngineeringData = z.output<typeof standpipePiezometerSchema>

export const geonorPiezometerEngineeringDataSchema = engineeringDataSchema.extend({
	relativePressure: z.number(),
	waterLevel: z.number(),
})
export type GeonorPiezometerEngineeringData = z.output<typeof geonorPiezometerEngineeringDataSchema>

export const stressMeterEngineeringDataSchema = engineeringDataSchema.extend({
	metersSum: z.number(),
	metersRatio: z.number(),
	temperature: z.number(),
	tension: z.number(),
})

export type ConcreteTensometerEngineeringData = z.output<typeof stressMeterEngineeringDataSchema>
