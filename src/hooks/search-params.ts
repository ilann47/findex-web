/* eslint-disable unicorn/no-array-reduce */
import { useCallback } from 'react'

import { useSearchParams as useSearchParamsReact } from 'react-router-dom'

export const useSearchParams = () => {
	const [searchParams, setSearchParams] = useSearchParamsReact()

	const getURLSearchParams = useCallback(() => new URL(document.location.href).searchParams, [])

	const deleteParam = useCallback(
		(key: string) => {
			const params = getURLSearchParams()
			params.delete(key)
			setSearchParams(params, { replace: true })
		},
		[setSearchParams]
	)

	const deleteParams = useCallback(
		(keys: string[]) => {
			for (const key of keys) deleteParam(key)
		},
		[setSearchParams]
	)

	const setParam = useCallback(
		(key: string, value?: string | boolean | number | Date | null) => {
			const params = getURLSearchParams()

			if (value) params.set(key, value.toString())
			else params.delete(key)

			setSearchParams(params, { replace: true })
		},
		[setSearchParams]
	)

	const clearParams = useCallback(() => {
		setSearchParams(
			(params) => {
				for (const key of params.keys()) {
					params.delete(key)
				}

				return params
			},
			{ replace: true }
		)
	}, [setSearchParams])

	const includesParams = useCallback(
		(keys: string[]) => {
			const params = [...searchParams.entries()]

			return params.some(([key]: string[]) => keys.includes(key))
		},
		[searchParams]
	)

	const getParams = useCallback(
		(keys: string[]) => {
			const params = [...searchParams.entries()]

			return params
				.filter(([key]) => keys.includes(key))
				.reduce<{ [key: string]: unknown }>((acc, [key, value]) => {
					acc[key] = value
					return acc
				}, {})
		},
		[searchParams]
	)

	return {
		deleteParam,
		setParam,
		deleteParams,
		searchParams,
		setSearchParams,
		clearParams,
		includesParams,
		getParams,
	}
}
