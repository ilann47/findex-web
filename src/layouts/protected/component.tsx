import { PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/auth'
import { RoleName } from '@/schemas/auth'

interface Props {
	role: RoleName | RoleName[]
}

export const ProtectedComponent = ({ role, children }: Props & PropsWithChildren) => {
	const { userHasRole } = useAuth()

	if (Array.isArray(role) ? !role.some((r) => userHasRole(r)) : !userHasRole(role)) {
		return null
	}

	return children
}
