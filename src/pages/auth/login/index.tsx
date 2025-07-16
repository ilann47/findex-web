import { Button, Stack, Typography, Box, Paper } from '@mui/material';
import { useAuth } from '../../../provider/hybrid-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GEDV_LOGO_PATH = '/src/assets/images/siprov_logotype.svg';

const LoginPage = () => {
  const { loginWithAzure, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    loginWithAzure();
  };

  return (
    <Stack
      sx={{
        backgroundColor: '#f0f2f5', // cinza bem claro para suavidade
        minHeight: '100vh',
        p: 2,
      }}
      justifyContent='center'
      alignItems='center'
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 4, sm: 5 },
          width: { xs: '90%', sm: 420 },
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Box
          component='img'
          src={GEDV_LOGO_PATH}
          alt='Logo'
          sx={{ width: 200, height: 'auto', mb: 3, opacity: 0.9 }}
        />

        <Typography
          variant='h5'
          component='h1'
          fontWeight='medium'
          sx={{ mb: 1 }}
        >
          Bem-vindo ao SIPROV
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mb: 4 }}
        >
          Acesse com sua conta Microsoft para continuar.
        </Typography>

        <Button
          onClick={handleLogin}
          variant='contained'
          size='large'
          fullWidth
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            backgroundColor: '#2F6FED', // tom azul suave
            '&:hover': {
              backgroundColor: '#1e56c5',
            },
            borderRadius: 1.5,
          }}
        >
          Entrar com a Microsoft
        </Button>
      </Paper>

      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ mt: 4, opacity: 0.6 }}
        align='center'
      >
        © {new Date().getFullYear()} SIPROV
      </Typography>
    </Stack>
  );
};

export default LoginPage;
