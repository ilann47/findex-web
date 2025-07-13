import React from 'react';
import { Alert, Box, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTravelAccess } from '@/hooks/useTravelAccess';
import { TravelProvider } from '@/contexts/travel-context';

interface TravelAccessGuardProps {
  travelId: number;
  children: React.ReactNode;
  showBackButton?: boolean;
}

export const TravelAccessGuard: React.FC<TravelAccessGuardProps> = ({
  travelId,
  children,
  showBackButton = true
}) => {
  const navigate = useNavigate();
  const { hasAccess, isLoading, error, travel } = useTravelAccess(travelId);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Box>Verificando permissões...</Box>
      </Box>
    );
  }

  if (!hasAccess) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            showBackButton ? (
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate('/travels')}
                startIcon={<ArrowBackIcon />}
              >
                Voltar
              </Button>
            ) : undefined
          }
        >
          <strong>Acesso Negado</strong>
          <br />
          {error || 'Você não tem permissão para acessar esta viagem.'}
        </Alert>
        
        {showBackButton && (
          <Button
            variant="outlined"
            onClick={() => navigate('/travels')}
            startIcon={<ArrowBackIcon />}
          >
            Voltar para Lista de Viagens
          </Button>
        )}
      </Box>
    );
  }

  // Se tem acesso, renderiza os children com o contexto da viagem
  return (
    <TravelProvider travel={travel}>
      {children}
    </TravelProvider>
  );
};
