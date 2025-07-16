import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  alpha,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import {
  WavingHandOutlined,
  SecurityOutlined,
  SpeedOutlined,
  CloudOutlined,
  GroupOutlined,
  AdminPanelSettingsOutlined
} from '@mui/icons-material';
import { useAuth } from '../../provider/hybrid-auth';

const WelcomePage: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const features = [
    {
      icon: <SecurityOutlined sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      title: 'Autenticação Segura',
      description: 'Sistema híbrido com Azure AD e Google OAuth'
    },
    {
      icon: <SpeedOutlined sx={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      title: 'Interface Moderna',
      description: 'Design responsivo e intuitivo'
    },
    {
      icon: <CloudOutlined sx={{ fontSize: 32, color: theme.palette.info.main }} />,
      title: 'Sistema Integrado',
      description: 'Múltiplos provedores de autenticação'
    },
    {
      icon: <GroupOutlined sx={{ fontSize: 32, color: theme.palette.success.main }} />,
      title: 'Gestão de Usuários',
      description: 'Controle de acesso e permissões'
    },
    {
      icon: <AdminPanelSettingsOutlined sx={{ fontSize: 32, color: theme.palette.warning.main }} />,
      title: 'Administração',
      description: 'Ferramentas avançadas para gestores'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header com informações do usuário */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          borderRadius: 3,
          p: 4,
          mb: 4,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            src={user?.picture}
            sx={{ 
              width: 80, 
              height: 80,
              border: `3px solid ${theme.palette.primary.main}`
            }}
          >
            <WavingHandOutlined sx={{ fontSize: 40 }} />
          </Avatar>
          
          <Box flex={1}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Bem-vindo ao SIPROV!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Olá, {user?.name || 'Usuário'}! 👋
            </Typography>
            <Stack direction="row" spacing={1} mt={2}>
              <Chip 
                label={user?.email} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                label={`Provedor: ${user?.provider?.toUpperCase()}`} 
                size="small" 
                color="secondary"
                variant="outlined"
              />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Recursos do Sistema */}
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
        Recursos Disponíveis
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                },
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Informações do Sistema */}
      <Box mt={6}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Status do Sistema
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Versão:</strong> {import.meta.env.VITE_APP_VERSION || '1.0.0'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Ambiente:</strong> {import.meta.env.VITE_NODE_ENV || 'development'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Provedor Padrão:</strong> {import.meta.env.VITE_DEFAULT_AUTH_PROVIDER?.toUpperCase() || 'AZURE'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>API Base:</strong> {import.meta.env.VITE_GEDV_API_URL || 'localhost:8080'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default WelcomePage;
