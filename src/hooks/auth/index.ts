import { useCallback, useEffect, useMemo } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { fromUnixTime, isPast } from 'date-fns'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'

import { useAuthGetOne } from '../get/get-auth'
import { useToast } from '../toast'
import { ENDPOINTS } from '@/constants/endpoints'
import { accessTokenAtom, refreshTokenAtom, tabFocusedTimeAtom, userAtom } from '@/contexts/atoms/auth'
import { Credentials, RoleName, User, CreateUserRequestPayload } from '@/schemas/auth'
import { KeycloakService } from '@/service/keycloak'
import { saadAPI } from '@/shared/saad'
import { addRequestHeaderFields } from '@/utils/add-request-header-fields'
import { getExpirationTime } from '@/utils/auth'

const keycloakService = new KeycloakService()

export const useAuth = () => {
	const { notifyError, notifySuccess } = useToast()

	const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
	const [refreshAccessToken, setRefreshAccessToken] = useAtom(refreshTokenAtom)
	const setTabFocusedTime = useSetAtom(tabFocusedTimeAtom)

	const queryClient = useQueryClient()

	const tokenUser = useAtomValue(userAtom)

	const { data: apiUser } = useAuthGetOne<User>({
		endpoint: `${ENDPOINTS.USER}`,
		idParam: {
			idUser: tokenUser?.id,
		},
		enabled: !!tokenUser,
	})

	const user: User | null = useMemo(
		() => (tokenUser ? { ...tokenUser, attributes: apiUser?.attributes } : null),
		[tokenUser, apiUser]
	)

	const logout = useCallback(() => {
		setAccessToken(RESET)
		setRefreshAccessToken(RESET)
		setTabFocusedTime(RESET)
	}, [setAccessToken, setRefreshAccessToken, setTabFocusedTime])

	const updateSession = useCallback((accessToken: string, refreshToken: string) => {
		setAccessToken(accessToken)
		setRefreshAccessToken(refreshToken)
	}, [])

	const login = useCallback(async (credentials: Credentials, onError: () => void, onSuccess: () => void) => {
		try {
			const { access_token, refresh_token } = await keycloakService.login(credentials)

			updateSession(access_token, refresh_token)

			queryClient.invalidateQueries()

			notifySuccess('auth.login.feedback.success')

			onSuccess()
		} catch (error) {
			console.log(error)

			notifyError('auth.login.feedback.wrong-credentials')

			onError()
		}
	}, [])

	const register = useCallback(async (register: CreateUserRequestPayload, onError: () => void, onSuccess: () => void) => {
		try {
			console.log('useAuth: Calling keycloakService.createUser...'); 

			await keycloakService.createUser(register)

			queryClient.invalidateQueries()

			notifySuccess('auth.login.feedback.success')

			onSuccess()
		} catch (error) {
			console.log(error)

			notifyError('auth.login.feedback.wrong-credentials')

			onError()
		}
	}, [])

	const userHasRole = useCallback((roleName: RoleName) => user?.roles.some((role) => role == roleName), [user])

	const refreshSession = useCallback(async () => {
		const refreshExpirationTime = getExpirationTime(refreshAccessToken)

		if (isPast(fromUnixTime(refreshExpirationTime))) return false

		try {
			const { access_token, refresh_token } = await keycloakService.refreshAccessToken(refreshAccessToken)

			updateSession(access_token, refresh_token)

			return true
		} catch (error) {
			console.log(error)
		}

		return false
	}, [refreshAccessToken])

	useEffect(() => {
		addRequestHeaderFields(saadAPI, { Authorization: `Bearer ${accessToken}` })
	}, [accessToken])

	return {
		user,
		login,
		logout,
		register,
		userHasRole,
		refreshSession,
		refreshAccessToken,
	}
}
