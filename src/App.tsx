import { CssBaseline } from '@mui/material'
import { flatten } from 'flat'
import { IntlProvider } from 'react-intl'
import 'leaflet/dist/leaflet.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import BackdropLoading from './components/ui/feedback/loading/backdrop'
import { useAlarmColors } from './hooks/alarm-colors'
import { useI18n } from './hooks/i18n'
import { useLoading } from './hooks/loading'
import { useLocale } from './hooks/locale'
import { router } from './router'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	const { locale } = useLocale()

	useAlarmColors()

	const messages = useI18n()

	const { isLoading } = useLoading()

	return (
		<IntlProvider locale={locale} messages={flatten(messages[locale])}>
			{isLoading && <BackdropLoading />}

			<ToastContainer autoClose={5000} position='bottom-left' />

			<CssBaseline />

			<RouterProvider router={router} />
		</IntlProvider>
	)
}

export default App
