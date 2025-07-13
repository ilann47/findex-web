import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AZURE_GROUPS } from '@/constants/groups';

import { NavigationLayout } from './layouts/navigation';
import { AuthorizedRoute } from './layouts/protected/component';
import { AuthenticatedRoute } from './layouts/protected/route';  

import ErrorFallbackPage from './pages/error/fallback';
import ForbiddenPage from './pages/error/forbidden';
import NotFoundPage from './pages/error/not-found';
import AuthCallback from "@/pages/auth/callback/AuthCallBack";

const LoginPage = lazy(() => import('@/pages/auth/login'));
const WelcomePage = lazy(() => import('./pages/welcome'));
const TravelsPage = lazy(() => import('@/pages/travels'));
const TravelDetailsPage = lazy(() => import('@/pages/travels/details'));

const LoadingSpinner = () => <div>Carregando...</div>;

export const router = createBrowserRouter([
  {
    errorElement: <ErrorFallbackPage />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
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
        element: <AuthorizedRoute role={AZURE_GROUPS.GRUPO_GERAL} />,
        children: [
          {
            element: <NavigationLayout />, 
            children: [
              {
                index: true,
                element: <WelcomePage />,
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