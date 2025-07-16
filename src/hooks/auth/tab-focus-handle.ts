import { useEffect } from 'react'

export const useTabFocusHandler = (onChange: (value: boolean) => void) => {
	const handleTabFocus = () => {
		onChange(!document.hidden)
	}

	useEffect(() => {
		document.addEventListener('visibilitychange', handleTabFocus)

		return () => {
			document.removeEventListener('visibilitychange', handleTabFocus)
		}
	}, [onChange])
}
