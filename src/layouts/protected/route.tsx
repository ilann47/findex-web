/* eslint-disable indent */

import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/hooks/auth'
import { RoleName } from '@/schemas/auth'

interface Props {
	role?: RoleName | RoleName[]
	allRolesRequired?: boolean
}

export const ProtectedRouteLayout = ({ role, allRolesRequired = true }: Props) => {
	const { userHasRole } = useAuth()

	if (role) {
		const hasAccess = Array.isArray(role)
			? allRolesRequired
				? role.every((r) => userHasRole(r))
				: role.some((r) => userHasRole(r))
			: userHasRole(role)

		if (!hasAccess) {
			return <Navigate to='/unauthorized' replace />
		}
	}

	return <Outlet />
}
