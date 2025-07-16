import React from 'react';
import { Box, Typography } from '@mui/material';

const TestPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ✅ Página de Teste Funcionando
      </Typography>
      <Typography variant="body1">
        Se você está vendo esta mensagem, o sistema está rodando corretamente.
      </Typography>
    </Box>
  );
};

export default TestPage;
