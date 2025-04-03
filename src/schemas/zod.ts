import { z } from 'zod'

const REQUIRED_MESSAGE_ID = 'form.required-field-error'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	if (
		issue.code === z.ZodIssueCode.invalid_enum_value ||
		issue.code === z.ZodIssueCode.invalid_type ||
		issue.code === z.ZodIssueCode.too_small ||
		issue.code === z.ZodIssueCode.too_big ||
		issue.code === z.ZodIssueCode.custom
	) {
		return { message: REQUIRED_MESSAGE_ID }
	}

	return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)

export { z as default } from 'zod'
