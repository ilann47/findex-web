import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Alert, Paper, Stack } from '@mui/material';
import { UnifiedAuthService } from '../../services/unified-auth.service';
import { ENV_CONFIG } from '../../config/environment';

const AuthProviderTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Verificando configurações...');
  const [providers, setProviders] = useState<string[]>([]);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = () => {
    try {
      // Verificar configuração do ambiente
      setConfig({
        azureClientId: ENV_CONFIG.azureClientId,
        googleClientId: ENV_CONFIG.googleClientId,
        enabledProviders: ENV_CONFIG.enabledProviders,
        defaultProvider: ENV_CONFIG.defaultProvider
      });

      // Verificar provedores habilitados
      const enabledProviders = UnifiedAuthService.getEnabledProviders();
      setProviders(enabledProviders);

      if (enabledProviders.length === 0) {
        setStatus('❌ Nenhum provedor habilitado');
      } else {
        setStatus(`✅ ${enabledProviders.length} provedor(es) habilitado(s): ${enabledProviders.join(', ')}`);
      }
    } catch (err: any) {
      setStatus('❌ Erro na configuração: ' + err.message);
    }
  };

  const testAzureInit = async () => {
    try {
      setStatus('Testando inicialização Azure...');
      await UnifiedAuthService.initialize();
      setStatus('✅ Azure inicializado com sucesso');
    } catch (err: any) {
      setStatus('❌ Erro Azure: ' + err.message);
    }
  };

  const testGoogleInit = async () => {
    try {
      setStatus('Testando inicialização Google...');
      await UnifiedAuthService.initialize();
      setStatus('✅ Google inicializado com sucesso');
    } catch (err: any) {
      setStatus('❌ Erro Google: ' + err.message);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Teste de Configuração dos Provedores
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Status: {status}
        </Typography>
        
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button variant="contained" onClick={checkConfiguration}>
            Recarregar Configuração
          </Button>
          
          <Button variant="contained" color="primary" onClick={testAzureInit}>
            Testar Azure
          </Button>
          
          <Button variant="contained" color="secondary" onClick={testGoogleInit}>
            Testar Google
          </Button>
        </Stack>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Configuração Detectada:</Typography>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
              mode: import.meta.env.MODE,
              azureClientId: import.meta.env.VITE_AZURE_CLIENT_ID ? '✅ Configurado' : '❌ Não configurado',
              googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ? '✅ Configurado' : '❌ Não configurado',
              url: window.location.origin,
              providers: providers,
              config: config
            }, null, 2)}
          </pre>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthProviderTest;
