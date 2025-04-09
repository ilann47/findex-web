import { FC, PropsWithChildren, useCallback, useEffect } from 'react'

import { useAtom } from 'jotai'

import { tabFocusedTimeAtom } from '@/contexts/atoms/auth'
import { useAuth } from '@/hooks/auth'
import { useTabFocusHandler } from '@/hooks/auth/tab-focus-handle'
import { useTimeoutHandler } from '@/hooks/auth/timeout-handler'
import { router } from '@/router'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [tabFocusedTime, setTabFocusedTime] = useAtom(tabFocusedTimeAtom)

	const { refreshAccessToken, logout, refreshSession, user } = useAuth()

	const handleLogout = useCallback(() => {
		logout()
		return router.navigate('/login')
	}, [])

	const handleTimeout = useCallback(async () => {
		if (refreshAccessToken) {
			const response = await refreshSession()

			if (!response) {
				return handleLogout()
			}
		}
	}, [refreshAccessToken])

	const handleTabFocus = useCallback(
		(isFocused: boolean) => {
			if (isFocused) {
				const currentTime = Date.now()

				if (currentTime - tabFocusedTime > 60 * 60 * 1000 && tabFocusedTime !== 0) {
					return handleLogout()
				}

				setTabFocusedTime(0)

				return
			}

			setTabFocusedTime(Date.now())
		},
		[tabFocusedTime]
	)

	useTimeoutHandler(handleTimeout, 25 * 60 * 1000)
	useTabFocusHandler(handleTabFocus)

	useEffect(() => {
		return () => {
			setTabFocusedTime(0)
		}
	}, [])

	useEffect(() => {
		if (!user) {
			router.navigate('/login')
		}
	}, [user])

	return <>{children}</>
}
