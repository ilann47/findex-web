import React from 'react'

import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'

import App from './app.tsx'
import { theme } from './theme/index.ts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.querySelector('#root')!).render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</React.StrictMode>
	</ThemeProvider>
)
