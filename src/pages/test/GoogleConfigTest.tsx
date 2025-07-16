import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Stack, 
  Alert,
  Chip,
  Button
} from '@mui/material';
import { googleConfig } from '../../authConfig';
import { ENV_CONFIG } from '../../config/environment';

const GoogleConfigTest: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    setCurrentUrl(window.location.origin);
  }, []);

  const requiredUrls = [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:3000', // Caso mude para Create React App
    'http://localhost:8080', // Caso use outra porta
  ];

  const redirectUrls = requiredUrls.map(url => `${url}/auth/callback`);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para clipboard!');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Configuração Google Cloud Console
      </Typography>
      
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔧 Configurações Atuais
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Client ID:</strong> {ENV_CONFIG.googleClientId || 'Não configurado'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>URL Atual:</strong> {currentUrl}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Redirect URI Configurado:</strong> {googleConfig.redirectUri}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Scope:</strong> {googleConfig.scope}
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="warning.main">
            ⚠️ URLs para Configurar no Google Cloud Console
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Como configurar:</strong><br/>
            1. Acesse <a href="https://console.cloud.google.com/apis/credentials" target="_blank">Google Cloud Console - Credentials</a><br/>
            2. Selecione seu projeto<br/>
            3. Clique no seu OAuth 2.0 Client ID<br/>
            4. Adicione as URLs abaixo nas seções correspondentes
          </Alert>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Authorized JavaScript origins:</strong>
          </Typography>
          <Stack spacing={1} sx={{ mb: 3 }}>
            {requiredUrls.map((url, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={url}
                  variant={url === currentUrl ? "filled" : "outlined"}
                  color={url === currentUrl ? "primary" : "default"}
                  size="small"
                />
                <Button 
                  size="small" 
                  onClick={() => copyToClipboard(url)}
                >
                  Copiar
                </Button>
              </Box>
            ))}
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Authorized redirect URIs:</strong>
          </Typography>
          <Stack spacing={1}>
            {redirectUrls.map((url, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={url}
                  variant={url === googleConfig.redirectUri ? "filled" : "outlined"}
                  color={url === googleConfig.redirectUri ? "secondary" : "default"}
                  size="small"
                />
                <Button 
                  size="small" 
                  onClick={() => copyToClipboard(url)}
                >
                  Copiar
                </Button>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="error.main">
            🚨 Erro Atual: redirect_uri_mismatch
          </Typography>
          
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>Problema:</strong> A URL de redirecionamento não está autorizada no Google Cloud Console.
          </Alert>
          
          <Alert severity="success">
            <strong>Solução:</strong><br/>
            1. Adicione <code>{googleConfig.redirectUri}</code> na lista "Authorized redirect URIs"<br/>
            2. Adicione <code>{currentUrl}</code> na lista "Authorized JavaScript origins"<br/>
            3. Salve as alterações<br/>
            4. Aguarde alguns minutos para propagação
          </Alert>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            🧪 Teste Rápido
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={() => window.location.href = '/login'}
            sx={{ mr: 2 }}
          >
            Ir para Login
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()}
          >
            Recarregar Configurações
          </Button>
        </Paper>
      </Stack>
    </Box>
  );
};

export default GoogleConfigTest;
