import React from 'react';
import { DirectorGuard } from '../../components/auth/DirectorGuard';
import { ViewLayout } from '@/layouts/view';
import { Typography, Box } from '@mui/material';

const ExpensePoliciesTestPage: React.FC = () => {
  

  return (
    <DirectorGuard>
      <ViewLayout.Root>
        <ViewLayout.Header.Root>
          <ViewLayout.Header.Title>
            Políticas de Despesas - Teste
          </ViewLayout.Header.Title>
        </ViewLayout.Header.Root>
        
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Página de Políticas de Despesas
          </Typography>
          <Typography variant="body1" color="success.main">
            ✅ Página carregada com sucesso!
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Se você está vendo esta mensagem, a página está funcionando corretamente.
          </Typography>
        </Box>
      </ViewLayout.Root>
    </DirectorGuard>
  );
};

export default ExpensePoliciesTestPage;
