import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AZURE_GROUPS } from './constants/groups';

import { NavigationLayout } from './layouts/navigation';
import { AuthorizedRoute } from './layouts/protected/component';
import { AuthenticatedRoute } from './layouts/protected/route';  
import HybridLoginPage from './pages/auth/HybridLoginPage';

import ErrorFallbackPage from './pages/error/fallback';
import ForbiddenPage from './pages/error/forbidden';
import NotFoundPage from './pages/error/not-found';
import AuthCallback from "./pages/auth/callback/AuthCallBack";

const WelcomePage = lazy(() => import('./pages/welcome'));
const TravelsPage = lazy(() => import('./pages/travels'));
const TravelDetailsPage = lazy(() => import('./pages/travels/details'));
const ExpensePoliciesPage = lazy(() => import('./pages/expense-policies'));
const UsersPage = lazy(() => import('./pages/users'));
const ReportsPage = lazy(() => import('./pages/reports'));
const SettingsPage = lazy(() => import('./pages/settings'));
const GoogleAuthTest = lazy(() => import('./pages/test/GoogleAuthTest'));
const AuthProviderTest = lazy(() => import('./pages/test/AuthProviderTest'));
const GoogleScriptTest = lazy(() => import('./pages/test/GoogleScriptTest'));
const GoogleConfigTest = lazy(() => import('./pages/test/GoogleConfigTest'));

const LoadingSpinner = () => <div>Carregando...</div>;

export const router = createBrowserRouter([
  {
    errorElement: <ErrorFallbackPage />,
    children: [
      {
        path: '/login',
        element: <HybridLoginPage />,
      },
      {
        path: '/auth/callback',
        element: <AuthCallback />,
      },
      {
        path: '/unauthorized',
        element: <ForbiddenPage />,
      },
    ],
  },

  {
    path: '/',
    errorElement: <ErrorFallbackPage />,
    
    element: <AuthenticatedRoute />,
    children: [
      {
        element: <AuthorizedRoute role={AZURE_GROUPS.CLIENTE} />,
        children: [
          {
            element: <NavigationLayout />, 
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <WelcomePage />
                  </Suspense>
                ),
              },

              {
                path: 'travels',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <TravelsPage />
                  </Suspense>
                ),
              },
              
              {
                path: 'travels/:travelId',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <TravelDetailsPage />
                  </Suspense>
                ),
              },
              
              {
                path: 'expense-policies',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ExpensePoliciesPage />
                  </Suspense>
                ),
              },
              
              {
                path: 'users',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <UsersPage />
                  </Suspense>
                ),
              },
              
              {
                path: 'reports',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ReportsPage />
                  </Suspense>
                ),
              },
              
              {
                path: 'settings',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <SettingsPage />
                  </Suspense>
                ),
              },
              
              {
                path: 'test/google-auth',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <GoogleAuthTest />
                  </Suspense>
                ),
              },
              
              {
                path: 'test/providers',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <AuthProviderTest />
                  </Suspense>
                ),
              },
              
              {
                path: 'test/google-script',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <GoogleScriptTest />
                  </Suspense>
                ),
              },
              
              {
                path: 'test/google-config',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <GoogleConfigTest />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);