import { lazy } from 'react';

import { Navigate, createBrowserRouter } from 'react-router-dom';

import { NavigationLayout } from './layouts/navigation'

import { ProtectedRouteLayout } from './layouts/protected/route';
import ErrorFallbackPage from './pages/error/fallback';
import ForbiddenPage from './pages/error/forbidden';
import NotFoundPage from './pages/error/not-found';

// Páginas relacionadas à autenticação
const AuthenticationPage = lazy(() => import('@/pages/authentication'));
const UserPage = lazy(() => import('@/pages/user'));
const GroupPage = lazy(() => import('@/pages/group'));

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
					element: <Navigate to='/auth' replace />,
					},
					{
						path: 'auth',
						children: [
							{
								index: true,
								element: <AuthenticationPage />,
							},
							{
								path: 'users/:userId',
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
]);