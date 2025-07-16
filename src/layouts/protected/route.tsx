import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../provider/hybrid-auth';
import { Box, CircularProgress, Typography } from '@mui/material';

export const AuthenticatedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Sempre mostrar loading primeiro para evitar flash de redirecionamento
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
          Verificando autenticação...
        </Typography>
      </Box>
    );
  }

  // Após o loading, verificar autenticação
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Usuário autenticado - renderiza as rotas protegidas
  return <Outlet />;
};
