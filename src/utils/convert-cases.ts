/* eslint-disable unicorn/prefer-string-replace-all */
export const camelToKebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const snakeToKebabCase = (str: string) => str.replace(/_/g, '-').toLowerCase()
