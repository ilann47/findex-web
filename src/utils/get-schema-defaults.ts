/* eslint-disable sonarjs/cognitive-complexity */
import { ZodEffects, ZodEnum, ZodLiteral, ZodObject, ZodTypeAny, ZodUnion, z } from 'zod'

const defaultValuesMap = new Map<ZodTypeAny, unknown>([
	[z.ZodString.create(), ''],
	[z.ZodNumber.create(), null],
	[z.ZodBoolean.create(), false],
	[z.ZodDate.create(), () => null],
	[z.ZodArray.create(z.any()), []],
	[z.ZodNull.create(), null],
	[z.ZodNullable.create(z.any()), null],
])

export const getSchemaDefaults = <Schema extends ZodTypeAny>(schema: Schema): z.infer<Schema> => {
	const processSchema = (schema: ZodTypeAny): unknown => {
		const innerSchema = schema instanceof ZodEffects ? schema._def.schema : schema

		if (innerSchema instanceof ZodObject) {
			return Object.fromEntries(
				Object.entries(innerSchema.shape).map(([key, value]: [string, unknown]) => {
					if (value instanceof z.ZodDefault) {
						return [key, value._def.defaultValue()]
					}

					if (value instanceof ZodObject || value instanceof ZodEffects) {
						return [key, processSchema(value)]
					}

					if (value instanceof ZodEnum) {
						return [key, value._def.values[0]]
					}

					if (value instanceof ZodLiteral) {
						return [key, value._def.value]
					}

					if (value instanceof ZodUnion) {
						const literalOption = value._def.options.find((option: unknown) => option instanceof ZodLiteral)
						if (literalOption) {
							return [key, (literalOption as ZodLiteral<unknown>)._def.value]
						}

						for (const option of value._def.options) {
							for (const [zodType, defaultValue] of defaultValuesMap.entries()) {
								if (option instanceof zodType.constructor) {
									return [key, typeof defaultValue === 'function' ? defaultValue() : defaultValue]
								}
							}
						}
					}

					for (const [zodType, defaultValue] of defaultValuesMap.entries()) {
						if (value instanceof zodType.constructor) {
							return [key, typeof defaultValue === 'function' ? defaultValue() : defaultValue]
						}
					}

					return [key, undefined]
				})
			)
		}

		return undefined
	}

	return processSchema(schema) as z.infer<Schema>
}
