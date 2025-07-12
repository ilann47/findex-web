import { Navigate, Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const AuthenticatedRoute = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Aguarda um momento para o MSAL processar completamente
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Aumentado para 1 segundo

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const activeAccount = instance.getActiveAccount();

    // Se não há conta ativa mas há contas disponíveis, define a primeira como ativa
    if (!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance, inProgress]);

  // Mostra loading enquanto o MSAL está processando OU ainda estamos aguardando
  if (isLoading || inProgress !== InteractionStatus.None) {
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

  const activeAccount = instance.getActiveAccount();

  // Se não há conta ativa E não há contas disponíveis, redireciona para login
  if (!activeAccount && accounts.length === 0) {
    console.log("❌ Nenhuma conta ativa ou disponível. Redirecionando para /login.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
