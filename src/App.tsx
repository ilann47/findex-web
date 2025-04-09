import { CssBaseline } from '@mui/material';
import { flatten } from 'flat';
import { IntlProvider } from 'react-intl';
import 'leaflet/dist/leaflet.css'; 
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BackdropLoading from './components/ui/feedback/loading/backdrop';
import { useAlarmColors } from './hooks/alarm-colors';
import { useI18n } from './hooks/i18n';
import { useLoading } from './hooks/loading';
import { useLocale } from './hooks/locale';
import { router } from './router'; 
import { AuthProvider } from './provider/auth';

function App() {
	const { locale } = useLocale();
	const messages = useI18n(); 
	const { isLoading } = useLoading(); 

	useAlarmColors();

	if (!messages || !messages[locale]) {
		return <BackdropLoading />; 
	}

	return (
		<IntlProvider locale={locale} messages={flatten(messages[locale])}>
			<AuthProvider>
				<CssBaseline />

				<ToastContainer autoClose={5000} position='bottom-left' />

				{isLoading && <BackdropLoading />}

				<RouterProvider router={router} />
			</AuthProvider>
		</IntlProvider>
	);
}

export default App;