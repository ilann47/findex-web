// Arquivo: src/App.tsx (VERSÃO HÍBRIDA COM SUPORTE AZURE E GOOGLE)

import { CssBaseline } from '@mui/material';
import { flatten } from 'flat';
import { IntlProvider } from 'react-intl';
import 'leaflet/dist/leaflet.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './router';
import messagesData from './messages.json';
import { useLocale } from './hooks/locale';

function App() {
  // Usa o hook de locale para obter o idioma atual
  const { locale } = useLocale();
  
  // Carrega as mensagens do arquivo JSON baseado no locale atual
  const messages = messagesData;
  const currentMessages = messages[locale] || messages.pt; // fallback para português
  
  // Converte locale para formato do IntlProvider
  const intlLocale = locale === 'es' ? 'es-ES' : 'pt-BR';

  return (
    // Carrega as mensagens baseadas no locale atual
    <IntlProvider locale={intlLocale} messages={flatten(currentMessages)}>
      <CssBaseline />

      <ToastContainer autoClose={5000} position='bottom-left' />

      {/* O roteador agora sempre está disponível - a proteção será feita nas rotas */}
      <RouterProvider router={router} />
    </IntlProvider>
  );
}

export default App;