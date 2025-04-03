import { Suspense } from 'react'

import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/menus/header'
import { Sidebar } from '@/components/menus/sidebar'

export const NavigationLayout = () => {
	return (
		<Stack direction='row'>
			<Header />
			<Sidebar />

			<Suspense>
				<Outlet />
			</Suspense>
		</Stack>
	)
}
