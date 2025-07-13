import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  Alert
} from '@mui/material';
import { DirectorGuard } from '../../components/auth/DirectorGuard';
import { ViewLayout } from '../../layouts/view';

const UsersPage: React.FC = () => {
  return (
    <DirectorGuard>
      <ViewLayout.Root>
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Gerenciamento de Usuários
            </Typography>
            
            <Paper sx={{ p: 3, mt: 3 }}>
              <Alert severity="info">
                Esta funcionalidade está em desenvolvimento.
                <br />
                Aqui será possível gerenciar usuários, permissões e grupos de acesso.
              </Alert>
            </Paper>
          </Box>
        </Container>
      </ViewLayout.Root>
    </DirectorGuard>
  );
};

export default UsersPage;
