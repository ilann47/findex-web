import { jwtDecode } from 'jwt-decode'

import { KEYCLOAK_CLIENT } from '@/constants/auth'
import { KeycloakToken, User } from '@/schemas/auth'

export const getUserFromToken = (token?: string | null): User | null => {
	if (!token) return null

	const decodedToken = decodeToken(token)

	const user: User = {
		id: decodedToken.sub,
		username: decodedToken.preferred_username,
		name: decodedToken.given_name,
		surname: decodedToken.family_name,
		enabled: decodedToken.enabled,
		email: decodedToken.email,
		roles: decodedToken.resource_access?.[KEYCLOAK_CLIENT]?.roles ?? [],
	}

	return user
}

export const decodeToken = (token: string) => jwtDecode<KeycloakToken>(token as string)

// Keycloak adapter filter patterns
export const getAuthEqualsFilter = (value: string) => `EQUALS,${value}`
export const getAuthLikeFilter = (value: string) => `LIKE,${value}`
