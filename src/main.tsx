import React from 'react'

import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'

import App from './app.tsx'
import { onSigninCallback, userManager } from './keycloak-config.ts'
import { theme } from './theme/index.ts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.querySelector('#root')!).render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</AuthProvider>
		</React.StrictMode>
	</ThemeProvider>
)
