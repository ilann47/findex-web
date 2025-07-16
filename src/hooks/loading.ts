import { useCallback } from 'react'

import { useAtom } from 'jotai'

import { loadingAtom } from '@/contexts/atoms/loading'

export const useLoading = () => {
	const [isLoading, setIsLoading] = useAtom(loadingAtom)

	const startLoading = useCallback(() => setIsLoading(true), [])
	const stopLoading = useCallback(() => setIsLoading(false), [])

	return {
		isLoading,
		startLoading,
		stopLoading,
	}
}
