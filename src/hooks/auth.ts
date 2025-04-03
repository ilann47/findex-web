import { useCallback, useEffect, useMemo } from 'react'

import { isPast } from 'date-fns'
import { useAuth as useAuthOidcContext } from 'react-oidc-context'

import { BASE_URL } from '@/keycloak-config'
import { RoleName } from '@/schemas/auth'
import { saadAPI } from '@/service/saad'
import { addRequestHeaderFields } from '@/utils/add-request-header-fields'
import { decodeToken, getUserFromToken } from '@/utils/auth'

export const useAuth = () => {
	const { signinRedirect, signoutRedirect, user: oidcUser, ...auth } = useAuthOidcContext()

	const token = useMemo(() => oidcUser?.access_token, [oidcUser])
	const user = useMemo(() => getUserFromToken(token), [token])

	const login = useCallback(() => {
		signinRedirect({ redirect_uri: BASE_URL })
	}, [signinRedirect])

	const logout = useCallback(() => {
		signoutRedirect()
	}, [signoutRedirect])

	const userHasRole = useCallback((roleName: RoleName) => user?.roles.some((role) => role == roleName), [user])

	useEffect(() => {
		if (token) {
			addRequestHeaderFields(saadAPI, { Authorization: `Bearer ${token}` })

			const decodedToken = decodeToken(token)

			if (isPast(new Date(decodedToken.exp * 1000))) {
				logout()
			}
		}
	}, [token, saadAPI])

	return {
		user,
		isAuthenticated: auth.isAuthenticated,
		isLoading: auth.isLoading,
		error: auth.error,
		login,
		logout,
		userHasRole,
	}
}
