import React, { useState } from 'react';
import { 
  Button, 
  Stack, 
  Typography, 
  Box, 
  Paper, 
  Alert
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/hybrid-auth';
import { UnifiedAuthService } from '../../services/unified-auth.service';

const SIPROV_LOGO_PATH = '/src/assets/images/siprov_logotype.svg';

const HybridLoginPage: React.FC = () => {
  const { isAuthenticated, isLoading, error, loginWithGoogle } = useAuth();
  const [providerErrors, setProviderErrors] = useState<{google?: string}>({});

  const enabledProviders = UnifiedAuthService.getEnabledProviders();
  const hasGoogle = enabledProviders.includes('google');

  // Se está autenticado e não está carregando, redirecionar usando React Router
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      setProviderErrors(prev => ({...prev, google: undefined}));
      await loginWithGoogle();
    } catch (error: any) {
      console.error('Erro no login Google:', error);
      
      let errorMessage = 'Falha no login com Google';
      if (error.message?.includes('não está disponível')) {
        errorMessage = 'Google Auth não configurado. Verifique as configurações do Google Cloud Console.';
      }
      
      setProviderErrors(prev => ({...prev, google: errorMessage}));
    }
  };

  return (
    <Stack
      sx={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        p: 2,
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 4, sm: 5 },
          width: { xs: '90%', sm: 450 },
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src={SIPROV_LOGO_PATH}
          alt="Logo SIPROV"
          sx={{ width: 200, height: 'auto', mb: 3, opacity: 0.9 }}
        />

        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ color: '#333', fontWeight: 500 }}
        >
          Bem-vindo ao SIPROV
        </Typography>

        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 4 }}
        >
          Faça login para continuar
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {providerErrors.google && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {providerErrors.google}
          </Alert>
        )}

        <Stack spacing={3} alignItems="center">
          {hasGoogle && (
            <Button
              variant="contained"
              size="large"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              sx={{
                backgroundColor: '#4285f4',
                '&:hover': {
                  backgroundColor: '#3367d6',
                },
                py: 1.5,
                px: 4,
                textTransform: 'none',
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                minWidth: 250,
              }}
            >
              {isLoading ? 'Entrando...' : 'Entrar com Google'}
            </Button>
          )}

          {!hasGoogle && (
            <Alert severity="info">
              Nenhum provedor de autenticação está configurado.
            </Alert>
          )}
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography variant="caption" color="textSecondary">
            Ao fazer login, você concorda com nossos termos de uso e política de privacidade.
          </Typography>
        </Box>
      </Paper>
    </Stack>
  );
};

export default HybridLoginPage;
