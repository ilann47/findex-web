import { Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/hybrid-auth';
import { Box, CircularProgress, Typography } from '@mui/material';

export const RootRedirect = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress />
        <Typography variant="body1">
          Carregando...
        </Typography>
      </Box>
    );
  }

  // Se está autenticado, vai para o dashboard
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se não está autenticado, vai para página de boas-vindas
  return <Navigate to="/welcome" replace />;
};
