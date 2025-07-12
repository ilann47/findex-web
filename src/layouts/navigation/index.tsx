import { Suspense } from 'react'

import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/menus/header'
import { Sidebar } from '@/components/menus/sidebar'

// Componente para mostrar enquanto as páginas carregam
const LoadingFallback = () => <div>Carregando página...</div>;

export const NavigationLayout = () => {
	return (
		<>
			<Header />
			<Sidebar />

			<Box component="main" sx={{ 
				position: 'relative',
				minHeight: '100vh',
				width: '100%'
			}}>
				<Suspense fallback={<LoadingFallback />}>
					<Outlet />
				</Suspense>
			</Box>
		</>
	)
}