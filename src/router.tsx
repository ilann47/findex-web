import { lazy } from 'react'

import { createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import { ProtectedRouteLayout } from './layouts/protected/route'
import ErrorFallbackPage from './pages/error/fallback'
import ForbiddenPage from './pages/error/forbidden'
import NotFoundPage from './pages/error/not-found'
import WelcomePage from './pages/welcome'
import RegisterPage from './pages/auth/signup'
import EmailPage from './pages/auth/email'
import ForgotPasswordPage from './pages/auth/forgot-password'
import EmailResetPasswordPage from './pages/auth/email-reset-password'
import ResetPasswordPage from './pages/auth/reset-password'

const LoginPage = lazy(() => import('@/pages/auth/login'))
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
						element: <WelcomePage />,
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
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'email',
				element: <EmailPage />,
			},
			{
				path: 'forgot-password',
				element: <ForgotPasswordPage />,
			},
			{
				path: 'email-reset-password',
				element: <EmailResetPasswordPage />,
			},
			{
				path: 'reset-password',
				element: <ResetPasswordPage />,
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
