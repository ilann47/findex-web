import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { msalInstance } from '@/authConfig';

interface MSALGuardProps {
  children: React.ReactNode;
}

export const MSALGuard: React.FC<MSALGuardProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMSAL = async () => {
      try {
        await msalInstance.initialize();

        const response = await msalInstance.handleRedirectPromise();
        
        if (response && response.account) {
          msalInstance.setActiveAccount(response.account);
        }
        
        setIsInitialized(true);
      } catch (err) {
        console.error("❌ MSALGuard: Erro ao inicializar MSAL:", err);
        setError("Erro ao inicializar sistema de autenticação");
      }
    };

    initializeMSAL();
  }, []);

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
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recarregue a página para tentar novamente
        </Typography>
      </Box>
    );
  }

  if (!isInitialized) {
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
          Inicializando sistema de autenticação...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};
