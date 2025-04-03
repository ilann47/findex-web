/* eslint-disable unicorn/prefer-string-replace-all */
export const normalize = (string: string) => {
	return string
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036F]/g, '')
}
