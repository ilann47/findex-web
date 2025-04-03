import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import { ProtectedRouteLayout } from './layouts/protected/route'
import ErrorFallbackPage from './pages/error/fallback'
import ForbiddenPage from './pages/error/forbidden'
import NotFoundPage from './pages/error/not-found'

const UarsPage = lazy(() => import('@/pages/uars'))
const UarPage = lazy(() => import('@/pages/uar/index'))
const AlarmsPage = lazy(() => import('@/pages/alarms'))
const InstrumentsPage = lazy(() => import('@/pages/instruments'))
const InstrumentPage = lazy(() => import('@/pages/instrument'))
const CalibrationHistoryPage = lazy(() => import('@/pages/calibration-history'))
const AnalysisPage = lazy(() => import('@/pages/analysis'))
const SettingsPage = lazy(() => import('@/pages/settings'))
const EngineeringDataPage = lazy(() => import('@/pages/engineering-data'))
const AuthenticationPage = lazy(() => import('@/pages/authentication'))
const UserPage = lazy(() => import('@/pages/user'))
const GroupPage = lazy(() => import('@/pages/group'))

export const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorFallbackPage />,
		element: <ProtectedRouteLayout />,
		children: [
			{
				element: <NavigationLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='uars' />,
					},
					{
						path: 'uars',
						element: <ProtectedRouteLayout role='UAR_LIST' />,
						children: [
							{
								index: true,
								element: <UarsPage />,
							},
							{
								path: ':uarId',
								children: [
									{
										index: true,
										element: <UarPage />,
									},
									{
										path: 'instruments/:instrumentType/:instrumentId',
										children: [
											{ index: true, element: <InstrumentPage /> },
											{
												path: 'engineering-values/:engineeringDataId',
												element: <EngineeringDataPage />,
											},
										],
									},
								],
							},
						],
					},
					{
						path: 'alarms',
						element: <ProtectedRouteLayout role='ALARM_LIST' />,
						children: [
							{
								index: true,
								element: <AlarmsPage />,
							},
						],
					},
					{
						path: 'instruments',
						element: <ProtectedRouteLayout role='INSTRUMENT_LIST' />,
						children: [
							{
								index: true,
								element: <InstrumentsPage />,
							},
							{
								path: ':instrumentType/:instrumentId',
								children: [
									{
										index: true,
										element: <InstrumentPage />,
									},
									{
										path: 'calibration-history',
										element: <CalibrationHistoryPage />,
									},
									{
										path: 'engineering-values/:engineeringDataId',
										element: <EngineeringDataPage />,
									},
								],
							},
						],
					},
					{
						path: 'analysis',
						children: [
							{
								index: true,
								element: <AnalysisPage />,
							},
						],
					},
					{
						path: 'auth',
						element: <ProtectedRouteLayout role={['AUTH_USER_LIST', 'AUTH_GROUP_LIST']} />,
						children: [
							{
								index: true,
								element: <AuthenticationPage />,
							},
							{
								path: 'users/:userId',
								element: <ProtectedRouteLayout role='AUTH_USER_LIST' />,
								children: [
									{
										index: true,
										element: <UserPage />,
									},
									{
										path: 'groups/:groupId',
										element: <GroupPage />,
									},
								],
							},
							{
								path: 'groups/:groupId',
								element: <ProtectedRouteLayout role='AUTH_GROUP_LIST' />,
								children: [
									{
										index: true,
										element: <GroupPage />,
									},
									{
										path: 'users/:userId',
										element: <UserPage />,
									},
								],
							},
						],
					},
					{
						path: 'settings',
						element: <ProtectedRouteLayout role='ALARM_COLOR_UPDATE' />,
						children: [
							{
								index: true,
								element: <SettingsPage />,
							},
						],
					},
				],
			},
			{
				path: 'unauthorized',
				element: <ForbiddenPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
])
