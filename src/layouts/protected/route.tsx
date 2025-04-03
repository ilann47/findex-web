/* eslint-disable indent */
import { useEffect } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { useAuth } from '@/hooks/auth'
import ErrorPage from '@/pages/error'
import { RoleName } from '@/schemas/auth'

interface Props {
	role?: RoleName | RoleName[]
}

export const ProtectedRouteLayout = ({ role }: Props) => {
	const { userHasRole, isAuthenticated, login, error, isLoading } = useAuth()

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			login()
		}
	}, [isAuthenticated, isLoading, login])

	if (error) {
		if (error?.message.includes('Session not active') || error?.message.includes('Token is not active')) {
			login()
		}

		return (
			<ErrorPage
				code={500}
				titleId='auth.error'
				descriptionId={{
					id: 'auth.error-message',
					values: {
						message: error.message,
					},
				}}
				button={false}
			/>
		)
	}

	if (isLoading || !isAuthenticated) {
		return <FullHeightLoading />
	}

	if (role && (Array.isArray(role) ? !role.some((r) => userHasRole(r)) : !userHasRole(role))) {
		return <Navigate to='/unauthorized' replace />
	}

	return <Outlet />
}
