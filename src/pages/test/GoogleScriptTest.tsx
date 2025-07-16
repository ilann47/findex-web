import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, Stack, Alert } from '@mui/material';

const GoogleScriptTest: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [googleAvailable, setGoogleAvailable] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    checkGoogleScript();
    setClientId(import.meta.env.VITE_GOOGLE_CLIENT_ID || 'Não configurado');
  }, []);

  const checkGoogleScript = () => {
    
    
    // Verificar se window.google existe
    if (window.google?.accounts) {
      setGoogleAvailable(true);
      setScriptLoaded(true);
      
      return;
    }

    // Verificar se já existe um script carregado
    const existingScript = document.querySelector('script[src*="accounts.google.com"]');
    if (existingScript) {
      setScriptLoaded(true);
      
    } else {
      
    }
  };

  const loadGoogleScript = () => {
    setError('');
    
    return new Promise<void>((resolve, reject) => {
      // Verificar se já foi carregado
      if (window.google?.accounts) {
        setGoogleAvailable(true);
        setScriptLoaded(true);
        resolve();
        return;
      }

      
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        
        setScriptLoaded(true);
        
        // Aguardar API estar disponível
        const checkAPI = () => {
          if (window.google?.accounts) {
            
            setGoogleAvailable(true);
            resolve();
          } else {
            
            setTimeout(checkAPI, 100);
          }
        };
        
        checkAPI();
      };
      
      script.onerror = (e) => {
        console.error('❌ Erro ao carregar script:', e);
        setError('Falha ao carregar script do Google');
        reject(new Error('Falha ao carregar script'));
      };
      
      document.head.appendChild(script);
    });
  };

  const testTokenClient = () => {
    if (!window.google?.accounts?.oauth2) {
      setError('Google OAuth2 não está disponível');
      return;
    }

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: (response: any) => {
          
          if (response.error) {
            setError(`Erro no token: ${response.error}`);
          } else {
            setError('');
            alert('Token obtido com sucesso! Verifique o console.');
          }
        },
      });

      
      setError('Token client criado com sucesso');
    } catch (err: any) {
      console.error('Erro ao criar token client:', err);
      setError(`Erro ao criar token client: ${err.message}`);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Teste Script Google Identity Services
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button variant="contained" onClick={checkGoogleScript}>
            Verificar Script
          </Button>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={loadGoogleScript}
            disabled={scriptLoaded}
          >
            Carregar Script Google
          </Button>
          
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={testTokenClient}
            disabled={!googleAvailable}
          >
            Testar Token Client
          </Button>
        </Stack>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Status:</Typography>
          <ul>
            <li>Script carregado: {scriptLoaded ? '✅' : '❌'}</li>
            <li>Google API disponível: {googleAvailable ? '✅' : '❌'}</li>
            <li>Client ID: {clientId}</li>
            <li>URL origem: {window.location.origin}</li>
            <li>Protocolo: {window.location.protocol}</li>
            <li>Domínio: {window.location.hostname}</li>
          </ul>
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>URLs que devem estar configuradas no Google Cloud Console:</strong><br/>
            • {window.location.origin}<br/>
            • http://localhost:5173<br/>
            • http://localhost:5174<br/>
            • http://localhost:5175<br/>
            • http://localhost:5176
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default GoogleScriptTest;
