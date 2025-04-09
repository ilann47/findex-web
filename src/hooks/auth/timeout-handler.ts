/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

export const useTimeoutHandler = (onTimeout: () => void, timeout: number) => {
	const timer = useRef<NodeJS.Timer | null>(null)

	const resetTimer = () => {
		if (timer.current) {
			clearTimeout(timer.current as any)
		}

		timer.current = setTimeout(onTimeout, timeout)
	}

	useEffect(() => {
		window.addEventListener('click', resetTimer)

		return () => {
			window.addEventListener('click', resetTimer)

			if (timer.current) {
				clearTimeout(timer.current as any)
			}
		}
	}, [onTimeout])
}
