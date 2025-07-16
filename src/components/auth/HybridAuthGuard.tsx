import React, { ReactNode } from 'react';
import { useAuth } from '../../provider/hybrid-auth';
import { Box, CircularProgress, Typography } from '@mui/material';
import HybridLoginPage from '../../pages/auth/HybridLoginPage';

interface HybridAuthGuardProps {
  children: ReactNode;
}

export const HybridAuthGuard: React.FC<HybridAuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, error } = useAuth();

  // Loading state
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
        <CircularProgress size={60} />
        <Typography variant="h6" color="textSecondary">
          Inicializando autenticação...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography variant="h5" color="error">
          Erro na Autenticação
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {error}
        </Typography>
      </Box>
    );
  }

  // Not authenticated - show login page
  if (!isAuthenticated) {
    return <HybridLoginPage />;
  }

  // Authenticated - show protected content
  return <>{children}</>;
};
