import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Alert, Paper } from '@mui/material';
import { GoogleAuthService } from '../../services/google-auth.service';

const GoogleAuthTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Não inicializado');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    testInitialization();
  }, []);

  const testInitialization = async () => {
    try {
      setStatus('Inicializando...');
      await GoogleAuthService.initialize();
      setStatus('✅ Inicializado com sucesso');
      setError('');
    } catch (err: any) {
      setStatus('❌ Falha na inicialização');
      setError(err.message || 'Erro desconhecido');
      console.error('Initialization error:', err);
    }
  };

  const testLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userData = await GoogleAuthService.login();
      setUser(userData);
      setStatus('✅ Login realizado com sucesso');
    } catch (err: any) {
      setError(err.message || 'Erro no login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testLogout = async () => {
    try {
      await GoogleAuthService.logout();
      setUser(null);
      setStatus('✅ Logout realizado');
    } catch (err: any) {
      setError(err.message || 'Erro no logout');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Teste Google OAuth
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Status: {status}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            variant="contained" 
            onClick={testInitialization}
            disabled={loading}
          >
            Reinicializar
          </Button>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={testLogin}
            disabled={loading}
          >
            {loading ? 'Fazendo login...' : 'Testar Login'}
          </Button>
          
          <Button 
            variant="outlined"
            onClick={testLogout}
            disabled={!user}
          >
            Logout
          </Button>
        </Box>
        
        {user && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Usuário autenticado:</Typography>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Box>
        )}
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary">
            Ambiente: {import.meta.env.MODE}<br/>
            Google Client ID: {import.meta.env.VITE_GOOGLE_CLIENT_ID ? '✅ Configurado' : '❌ Não configurado'}<br/>
            URL atual: {window.location.origin}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default GoogleAuthTest;
